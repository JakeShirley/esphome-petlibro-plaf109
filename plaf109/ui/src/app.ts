import { LitElement, type TemplateResult } from "lit";
import { state } from "lit/decorators.js";
import { type Appearance, applyAppearance, loadAppearance, saveAppearance } from "./appearance";
import { COOLING_MIN_TARGET_F, ENTITIES, type Entity, entityId } from "./entities";
import {
  atLocalTime,
  dayNumber,
  groupByDay,
  parseDateToDay,
  parseTimeToSeconds,
  projectSchedule,
  type Schedule,
} from "./schedule";
import { renderTemplate } from "./template";

if (!document.querySelector('meta[name="viewport"]')) {
  const viewport = document.createElement("meta");
  viewport.name = "viewport";
  viewport.content = "width=device-width, initial-scale=1";
  document.head.appendChild(viewport);
}
if (!document.documentElement.lang) document.documentElement.lang = "en";

interface EntityState {
  id: string;
  state?: string;
  value?: string | number | boolean | null;
  min_value?: string;
  max_value?: string;
  step?: string;
}

function formatUptime(totalSeconds: number): string {
  const hour = Math.floor(totalSeconds / 3600);
  const min = Math.floor((totalSeconds % 3600) / 60);
  const sec = Math.floor(totalSeconds % 60);
  if (hour > 0) return `Uptime ${hour}h ${min}m`;
  if (min > 0) return `Uptime ${min}m ${sec}s`;
  return `Uptime ${sec}s`;
}

const timeFormat = new Intl.DateTimeFormat([], { hour: "numeric", minute: "2-digit" });

function formatLastVisitAt(raw: string | undefined): string | null {
  const dttm = raw ? new Date(raw) : null;
  if (!dttm || Number.isNaN(dttm.getTime())) return null;
  const time = timeFormat.format(dttm);
  if (dttm.toDateString() === new Date().toDateString()) return time;
  return dttm.toLocaleDateString([], { month: "short", day: "numeric" }) + ", " + time;
}

const durationFormat = new Intl.DurationFormat([], { style: "narrow" });

function formatDuration(totalSeconds: number): string {
  const s = Math.round(totalSeconds);
  const duration: Partial<Record<Intl.DurationFormatUnit, number>> = {
    hours: Math.floor(s / 3600),
    minutes: Math.floor((s % 3600) / 60),
    seconds: s % 60,
  };
  return durationFormat.format(duration) || "0s";
}

const monthFormat = new Intl.DateTimeFormat([], { month: "short" });
const weekdayFormat = new Intl.DateTimeFormat([], { weekday: "long" });
const monthDayFormat = new Intl.DateTimeFormat([], { month: "short", day: "numeric" });

function formatDayTitle(day: number, today: number): string {
  if (day === today) return "Today";
  if (day === today + 1) return "Tomorrow";
  return weekdayFormat.format(atLocalTime(day, 0));
}

// Only for meals within a day, further out the day title says enough
function formatCountdown(ms: number): string | null {
  const totalMinutes = Math.max(1, Math.ceil(ms / 60000));
  if (totalMinutes > 24 * 60) return null;
  return "in " + durationFormat.format({ hours: Math.floor(totalMinutes / 60), minutes: totalMinutes % 60 });
}

// Strips the "(config hash 0x...)" part out of the version.text_sensor state
const FIRMWARE_VERSION_RE = /^([^\s(]+)(?:\s*\(config hash 0x[0-9a-f]+)?(?:,\s*(built[^)]*))?\)?$/i;

function formatFirmwareVersion(raw: string): string {
  const m = FIRMWARE_VERSION_RE.exec(raw);
  if (!m) return raw;
  return m[2] ? `${m[1]}, ${m[2]}` : (m[1] ?? raw);
}

function parseTimeToMinutes(value: string | undefined): number | null {
  if (typeof value !== "string") return null;
  const parts = value.split(":");
  const hh = Number(parts[0]);
  const mm = Number(parts[1]);
  if (!Number.isFinite(hh) || !Number.isFinite(mm)) return null;
  return hh * 60 + mm;
}

function decimalsOf(n: number): number {
  const s = String(n);
  const dot = s.indexOf(".");
  return dot === -1 ? 0 : s.length - dot - 1;
}

// Intl duration units, each split into the next unit up, so 90 minutes shows as "1 hr 30 min"
const LARGER_UNIT: Partial<Record<string, string>> = { second: "minute", minute: "hour" };

/** Short local unit format, e.g. "45 min" */
function unitFormat(unit: string): Intl.NumberFormat {
  return new Intl.NumberFormat([], { style: "unit", unit, unitDisplay: "short" });
}

/**
 * Formats with as many decimals as `step`, so step 0.5 shows "40.5"
 * @param unit an Intl duration unit ("minute", "second"), or a suffix such as "°"
 * @param zeroText replaces the whole text at 0, for numbers where 0 means "disabled"
 */
function formatNumber(n: number, step: number, unit: string, zeroText?: string): string {
  if (n === 0 && zeroText !== undefined) return zeroText;
  if (!Number.isFinite(n)) return "--";
  const larger = LARGER_UNIT[unit];
  if (!larger) return n.toFixed(decimalsOf(step)) + unit;
  const big = Math.floor(n / 60);
  const rest = n % 60;
  if (!big) return unitFormat(unit).format(rest);
  const bigText = unitFormat(larger).format(big);
  return rest ? `${bigText} ${unitFormat(unit).format(rest)}` : bigText;
}

/** The unit as typed after a number, e.g. "min" */
function unitLabel(unit: string): string {
  if (!LARGER_UNIT[unit]) return unit;
  return unitFormat(unit).formatToParts(1).find((part) => part.type === "unit")?.value ?? unit;
}

interface NextMeal {
  index: number | null; // null when no meal is coming up
  label: string;
  timeText: string;
}

const UPCOMING_MEAL_COUNT = 6;

export interface UpcomingMeal {
  index: number; // 0 = meal one
  name: string;
  timeText: string;
  countdownText: string | null;
}

export interface UpcomingDay {
  monthText: string;
  dayOfMonthText: string;
  title: string;
  isToday: boolean;
  meals: UpcomingMeal[]; // empty for days without meals
}

export interface UpcomingMeals {
  off: boolean;
  periodText: string;
  days: UpcomingDay[];
}

export type Tab = "feeder" | "schedule" | "settings";

/** The meal being edited in the sheet, saved only on ✓ */
export interface MealDraft {
  index: number;
  time: string; // HH:MM
  date: string; // YYYY-MM-DD, "" if the entity is missing
}

export interface MealInfo {
  index: number;
  name: string;
  timeText: string;
  dateText: string;
}

export interface Confirm {
  title: string;
  text: string;
  action: string;
  destructive?: boolean;
  onConfirm: () => void;
}

const mealDateFormat = new Intl.DateTimeFormat([], { weekday: "short", month: "short", day: "numeric" });

export class PlaRemote extends LitElement {
  private editing?: string; // entity id of the focused number input
  private confirmed: Record<string, EntityState> = {}; // last state from the device, without optimistic values
  private eventSource?: EventSource;
  private nextMealTimer?: ReturnType<typeof setInterval>;
  private uptimeTimer?: ReturnType<typeof setInterval>;
  private toastTimer?: ReturnType<typeof setTimeout>;
  private uptimeBaseSeconds?: number;
  private uptimeBaseAt?: number;

  @state() private store: Record<string, EntityState> = {};
  @state() deviceTitle = "PLAF109";
  @state() connected = false;
  @state() connLabel = "Connecting…";
  @state() toast: { text: string; info: boolean } | null = null;
  @state() showSettingsHelp = false;
  @state() tab: Tab = "feeder";
  @state() draft: MealDraft | null = null;
  @state() menuOpen = false;
  @state() confirm: Confirm | null = null;
  @state() appearance: Appearance = loadAppearance();

  protected override createRenderRoot(): this {
    return this;
  }

  override connectedCallback(): void {
    super.connectedCallback();
    this.connectSSE();
    // meal times don't change every tick, but "next" does as the clock moves past one
    this.nextMealTimer = setInterval(() => this.requestUpdate(), 30000);
    this.uptimeTimer = setInterval(() => this.renderUptime(), 1000);
    applyAppearance(this.appearance);
    document.addEventListener("keydown", this.onDocumentKeydown);
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    if (this.nextMealTimer) clearInterval(this.nextMealTimer);
    if (this.uptimeTimer) clearInterval(this.uptimeTimer);
    if (this.toastTimer) clearTimeout(this.toastTimer);
    if (this.eventSource) this.eventSource.close();
    this.toast = null;
    this.setConnected(false);
    this.editing = undefined;
    document.removeEventListener("keydown", this.onDocumentKeydown);
  }

  private readonly onDocumentKeydown = (e: KeyboardEvent): void => {
    if (e.key === "Escape") this.closeOverlays();
  };

  override render(): TemplateResult {
    return renderTemplate(this);
  }

  private entityState(entity: Entity): EntityState | undefined {
    return this.store[entityId(entity)];
  }

  private num(entity: Entity): number {
    const value = this.entityState(entity)?.value;
    return typeof value === "number" || (typeof value === "string" && value !== "") ? Number(value) : Number.NaN;
  }

  private str(entity: Entity): string | undefined {
    const value = this.entityState(entity)?.value;
    return typeof value === "string" ? value : undefined;
  }

  isOn(entity: Entity): boolean {
    const state = this.entityState(entity);
    return state?.value === true || state?.state === "ON";
  }

  // web_server sends state "NA" for a sensor with no reading (NaN), e.g. until it first publishes after boot
  stateText(entity: Entity, fallback = "--"): string {
    const text = this.entityState(entity)?.state;
    return text && text !== "NA" ? text : fallback;
  }

  numText(entity: Entity, unit: string, zeroText?: string): string {
    return formatNumber(this.num(entity), this.stepOf(entity), unit, zeroText);
  }

  // null when no meal was missed
  get missedMealReason(): string | null {
    return this.str(ENTITIES.missedMealReason) || null;
  }

  get onBattery(): boolean {
    return !!this.entityState(ENTITIES.acPower) && !this.isOn(ENTITIES.acPower);
  }

  // false only when the firmware reports no batteries; older firmware without the entity is assumed to have them
  get batteryInstalled(): boolean {
    return !this.entityState(ENTITIES.batteryInstalled) || this.isOn(ENTITIES.batteryInstalled);
  }

  get batteryLow(): boolean {
    const pct = this.num(ENTITIES.battery);
    return this.onBattery && Number.isFinite(pct) && pct <= 15;
  }

  get batteryPctText(): string {
    const pct = this.num(ENTITIES.battery);
    return Number.isFinite(pct) ? Math.round(pct) + "%" : "--%";
  }

  get presenceText(): string {
    if (!this.entityState(ENTITIES.presence)) return "--";
    return this.isOn(ENTITIES.presence) ? "Here" : "Away";
  }

  get lastVisitDurationText(): string {
    const s = this.num(ENTITIES.lastVisitDuration);
    return Number.isFinite(s) ? formatDuration(s) : "--";
  }

  get lastVisitAtText(): string | null {
    return formatLastVisitAt(this.entityState(ENTITIES.lastVisitTime)?.state);
  }

  get totalVisitText(): string {
    const s = this.num(ENTITIES.totalVisitTime);
    return Number.isFinite(s) ? formatDuration(s) : "--";
  }

  get firmwareVersionText(): string {
    const d = this.entityState(ENTITIES.firmwareVersion);
    if (!d) return "—";
    return d.state ? formatFirmwareVersion(d.state) : "--";
  }

  get scheduleOff(): boolean {
    return !!this.entityState(ENTITIES.schedule) && !this.isOn(ENTITIES.schedule);
  }

  private projectSchedule(now: Date, count: number): Schedule {
    const slots = ENTITIES.feedTimes.map((meal, i) => {
      const date = ENTITIES.mealDates[i];
      return {
        date: parseDateToDay(date ? this.str(date) : undefined),
        time: parseTimeToSeconds(this.str(meal)),
      };
    });
    return projectSchedule(slots, now, count);
  }

  get nextMeal(): NextMeal {
    if (this.scheduleOff) return { index: null, label: "Schedule disabled", timeText: "Off" };

    const now = new Date();
    const next = this.projectSchedule(now, 1).meals[0];
    if (!next) return { index: null, label: "", timeText: "--:--" };
    const name = ENTITIES.feedTimes[next.index]?.name ?? "";
    const today = dayNumber(now);
    return {
      index: next.index,
      label: next.day === today ? name : name + " · " + formatDayTitle(next.day, today),
      timeText: timeFormat.format(atLocalTime(next.day, next.time)),
    };
  }

  get upcomingMeals(): UpcomingMeals {
    if (this.scheduleOff) return { off: true, periodText: "Off", days: [] };

    const now = new Date();
    const today = dayNumber(now);
    const { period, meals } = this.projectSchedule(now, UPCOMING_MEAL_COUNT);
    const days = groupByDay(meals).map((group): UpcomingDay => {
      const date = atLocalTime(group.day, 0);
      return {
        monthText: monthFormat.format(date),
        dayOfMonthText: String(date.getDate()),
        title:
          group.lastDay > group.day
            ? monthDayFormat.format(date) + " – " + monthDayFormat.format(atLocalTime(group.lastDay, 0))
            : formatDayTitle(group.day, today),
        isToday: group.day === today,
        meals: group.meals.map((meal) => {
          const at = atLocalTime(meal.day, meal.time);
          return {
            index: meal.index,
            name: ENTITIES.feedTimes[meal.index]?.name ?? "",
            timeText: timeFormat.format(at),
            countdownText: formatCountdown(at.getTime() - now.getTime()),
          };
        }),
      };
    });
    return { off: false, periodText: period === 1 ? "Daily" : `Every ${period} days`, days };
  }

  private stepOf(entity: Entity): number {
    const step = Number(this.entityState(entity)?.step);
    return step > 0 ? step : 1;
  }

  private rangeOf(entity: Entity): { min: number; max: number; step: number } {
    const cur = this.entityState(entity);
    const deviceMin = cur?.min_value !== undefined ? Number(cur.min_value) : -Infinity;
    // enforced here too in case the device doesn't report its range
    const floor = entity === ENTITIES.coolingTarget ? COOLING_MIN_TARGET_F : -Infinity;
    return {
      min: Math.max(deviceMin, floor),
      max: cur?.max_value !== undefined ? Number(cur.max_value) : Infinity,
      step: this.stepOf(entity),
    };
  }

  /** Parses "10", "10 min", or `zeroText` as 0, rounded to the step */
  private parseNumberInput(
    entity: Entity,
    raw: string,
    unit: string,
    zeroText?: string,
  ): { value: number; rounded: boolean } | { error: string } {
    const text = raw.trim().toLowerCase();
    const label = unitLabel(unit).toLowerCase();
    let value = Number.NaN;
    if (text === zeroText?.toLowerCase()) {
      value = 0;
    } else {
      const numberText = text.endsWith(label) ? text.slice(0, -label.length).trim() : text;
      if (numberText !== "") value = Number(numberText);
    }
    if (!Number.isFinite(value)) return { error: "Enter a number" };

    const { min, max, step } = this.rangeOf(entity);
    if (value < min || value > max) {
      return { error: `Must be between ${formatNumber(min, step, unit)} and ${formatNumber(max, step, unit)}` };
    }
    const base = Number.isFinite(min) ? min : 0;
    const steps = (value - base) / step;
    if (Math.abs(steps - Math.round(steps)) <= 1e-9) return { value, rounded: false };
    return { value: Math.min(max, base + Math.round(steps) * step), rounded: true };
  }

  /** Sends an action to the device, resolving true on success */
  private async post(entity: Entity, action: string, query?: string): Promise<boolean> {
    let url = "/" + entity.domain + "/" + encodeURIComponent(entity.name) + "/" + action;
    if (query) url += "?" + query;
    try {
      const res = await fetch(url, { method: "POST", credentials: "same-origin", keepalive: true });
      if (res.ok) return true;
      this.showToast(`Failed to save, server returned ${res.status}`);
    } catch (err) {
      console.error("PLAF109 remote: request failed", url, err);
      this.showToast("Failed to save, request failed");
    }
    return false;
  }

  private showToast(text: string, info = false): void {
    this.toast = { text, info };
    if (this.toastTimer) clearTimeout(this.toastTimer);
    this.toastTimer = setTimeout(() => (this.toast = null), 5000);
  }

  /** Subscribes to the device's state and ping events */
  private connectSSE(): void {
    const eventSource = new EventSource("/events");
    eventSource.addEventListener("state", (e: Event) => {
      const event = e as MessageEvent<string>;
      let state: EntityState;
      try {
        state = JSON.parse(event.data);
      } catch {
        return;
      }
      if (!state?.id) return;
      const merged = { ...this.confirmed[state.id], ...state };
      this.confirmed[state.id] = merged;
      this.store = { ...this.store, [state.id]: merged };
    });
    eventSource.addEventListener("ping", (e: Event) => {
      const event = e as MessageEvent<string>;
      try {
        const { title, uptime }: { title?: string; uptime?: number } = JSON.parse(event.data);
        if (typeof title === "string") this.deviceTitle = document.title = title;
        if (typeof uptime === "number") {
          this.uptimeBaseSeconds = uptime;
          this.uptimeBaseAt = Date.now();
          this.renderUptime();
        }
      } catch {
        return;
      }
    });
    eventSource.addEventListener("open", () => this.setConnected(true));
    eventSource.onerror = () => this.setConnected(false);
    this.eventSource = eventSource;
  }

  private setConnected(ok: boolean): void {
    this.connected = ok;
    if (!ok) {
      this.connLabel = "Reconnecting…";
    } else {
      this.renderUptime();
    }
  }

  private renderUptime(): void {
    if (!this.connected || this.uptimeBaseSeconds === undefined || this.uptimeBaseAt === undefined) return;
    const elapsed = this.uptimeBaseSeconds + Math.floor((Date.now() - this.uptimeBaseAt) / 1000);
    this.connLabel = formatUptime(elapsed);
  }

  /** Meal time as HH:MM for <input type=time> */
  mealTimeValue(meal: Entity): string {
    return this.str(meal)?.slice(0, 5) ?? "";
  }

  /**
   * Whether any scheduled meal starts too soon after the previous one in date and time order,
   * wrapping from the cycle's last meal to its first. Meal numbers don't affect the order.
   * @param gap minimum minutes between meal starts
   */
  private mealsOverlap(gap: number): boolean {
    if (!this.isOn(ENTITIES.schedule)) return false;
    const today = dayNumber(new Date());
    const meals = ENTITIES.feedTimes.map((meal, i) => {
      const date = ENTITIES.mealDates[i];
      return {
        day: parseDateToDay(date ? this.str(date) : undefined) ?? today,
        minutes: parseTimeToMinutes(this.str(meal)),
      };
    });
    const days = meals.map((m) => m.day);
    const period = Math.max(...days) - Math.min(...days) + 1;
    const starts = meals
      .filter((m): m is { day: number; minutes: number } => m.minutes !== null)
      .map((m) => m.day * 24 * 60 + m.minutes)
      .sort((a, b) => a - b);
    if (starts.length < 2) return false;
    return starts.some((start, i) => {
      const next = starts[i + 1] ?? (starts[0] ?? 0) + period * 24 * 60;
      return next - start < gap;
    });
  }

  private get feedingMinutes(): number {
    return this.num(ENTITIES.minimumFeedingTime) || 0;
  }

  /**
   * Error text when the feeding time alone runs into the next meal
   * @returns null when no meals overlap
   */
  get mealOverlapError(): string | null {
    if (!this.mealsOverlap(this.feedingMinutes)) return null;
    return "Meal(s) are less than the feeding time apart, so this schedule will cause a meal will be skipped.";
  }

  /**
   * Warning text when a meal could run into the next meal by waiting out the arrival timeout
   * @returns null when no meals could overlap, or when the error is already shown
   */
  get mealOverlapWarning(): string | null {
    if (this.mealOverlapError) return null;
    if (!this.mealsOverlap((this.num(ENTITIES.arrivalTimeout) || 0) + this.feedingMinutes)) return null;
    return `Meals are less than the arrival timeout plus feeding time apart, so a meal might be skipped.`;
  }

  get longArrivalTimeout(): boolean {
    return this.num(ENTITIES.arrivalTimeout) > 4 * 60;
  }

  toggleSettingsHelp(): void {
    this.showSettingsHelp = !this.showSettingsHelp;
  }

  pressButton(entity: Entity): void {
    void this.post(entity, "press");
  }

  // Lit only re-sets .checked when the rendered value changes, so undo a rejected toggle manually
  async setSwitch(e: Event, entity: Entity): Promise<void> {
    const input = e.target as HTMLInputElement;
    const ok = await this.post(entity, input.checked ? "turn_on" : "turn_off");
    if (!ok) input.checked = this.isOn(entity);
  }

  toggleSwitch(entity: Entity): void {
    void this.post(entity, this.isOn(entity) ? "turn_off" : "turn_on");
  }

  /** Cooling keeps wet food safe, so turning it off needs a confirmation */
  setCooling(e: Event): void {
    const input = e.target as HTMLInputElement;
    if (input.checked) {
      void this.setSwitch(e, ENTITIES.cooling);
      return;
    }
    input.checked = true; // stays on unless confirmed
    this.ask({
      title: "Turn Off Cooling?",
      text: "Wet food can spoil quickly without cooling. Only turn it off if the feeder is empty or holding dry food.",
      action: "Turn Off",
      destructive: true,
      onConfirm: () => {
        input.checked = false;
        void this.setSwitch(e, ENTITIES.cooling);
      },
    });
  }

  get coolingMinText(): string {
    return Math.round(this.rangeOf(ENTITIES.coolingTarget).min) + "°F";
  }

  canStep(entity: Entity, direction: 1 | -1): boolean {
    const curVal = this.num(entity);
    if (!Number.isFinite(curVal)) return false;
    const { min, max } = this.rangeOf(entity);
    return direction < 0 ? curVal > min : curVal < max;
  }

  stepNumberEntity(entity: Entity, direction: 1 | -1): void {
    const curVal = this.num(entity);
    if (!Number.isFinite(curVal)) return;
    const { min, max, step } = this.rangeOf(entity);
    const next = Math.min(max, Math.max(min, curVal + direction * step));
    void this.setValue(entity, next.toFixed(decimalsOf(step)));
  }

  /** Updates the store immediately, reverting if the device rejects it */
  private async setValue(entity: Entity, value: string): Promise<void> {
    const id = entityId(entity);
    const optimistic = { ...this.store[id], id, value, state: value };
    this.store = { ...this.store, [id]: optimistic };
    const ok = await this.post(entity, "set", "value=" + encodeURIComponent(value));
    if (ok || this.store[id] !== optimistic) return;
    const store = { ...this.store };
    const confirmed = this.confirmed[id];
    if (confirmed) store[id] = confirmed;
    else delete store[id];
    this.store = store;
  }

  isEditing(entity: Entity): boolean {
    return this.editing === entityId(entity);
  }

  onEditFocus(entity: Entity): void {
    this.editing = entityId(entity);
  }

  onEditKeydown(e: KeyboardEvent): void {
    const input = e.target as HTMLInputElement;
    if (e.key === "Escape") {
      this.editing = undefined; // makes the number change handler skip it
      e.stopPropagation();
    }
    if (e.key === "Enter" || e.key === "Escape") input.blur();
  }

  /** Restores the formatted stored value */
  onEditBlur(): void {
    this.editing = undefined;
    this.requestUpdate();
  }

  /** Shows the bare number while typing */
  onNumberFocus(e: Event, entity: Entity): void {
    const input = e.target as HTMLInputElement;
    this.onEditFocus(entity);
    const n = this.num(entity);
    input.value = Number.isFinite(n) ? n.toFixed(decimalsOf(this.stepOf(entity))) : "";
    input.select();
  }

  /**
   * Saves a typed number, rounded to the step
   * @param zeroText typed in place of 0, e.g. "Off"
   */
  onNumberChange(e: Event, entity: Entity, unit: string, zeroText?: string): void {
    const input = e.target as HTMLInputElement;
    if (!this.isEditing(entity) || input.value.trim() === "") return; // blur puts the current value back
    const result = this.parseNumberInput(entity, input.value, unit, zeroText);
    if ("error" in result) {
      this.showToast(result.error);
      return;
    }
    const step = this.stepOf(entity);
    if (result.rounded) {
      const stepText = formatNumber(step, step, unit);
      this.showToast(`Rounded to ${formatNumber(result.value, step, unit, zeroText)}, entity accepts steps of ${stepText}`, true);
    }
    if (result.value !== this.num(entity)) void this.setValue(entity, result.value.toFixed(decimalsOf(step)));
  }

  get meals(): MealInfo[] {
    return ENTITIES.feedTimes.map((meal, index) => {
      const date = ENTITIES.mealDates[index];
      const day = parseDateToDay(date ? this.str(date) : undefined);
      const seconds = parseTimeToSeconds(this.str(meal));
      return {
        index,
        name: meal.name,
        timeText: seconds === null ? "--:--" : timeFormat.format(atLocalTime(0, seconds)),
        dateText: day === null ? "" : mealDateFormat.format(atLocalTime(day, 0)),
      };
    });
  }

  get chamberText(): string {
    const t = this.num(ENTITIES.chamberTemp);
    return Number.isFinite(t) ? Math.round(t) + "°" : "--°";
  }

  get coolingTargetText(): string {
    const t = this.num(ENTITIES.coolingTarget);
    return Number.isFinite(t) ? Math.round(t) + "°" : "--°";
  }

  setTab(tab: Tab): void {
    this.tab = tab;
    this.closeOverlays();
    window.scrollTo({ top: 0 });
  }

  closeOverlays(): void {
    this.draft = null;
    this.menuOpen = false;
    this.confirm = null;
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  ask(confirm: Confirm): void {
    this.menuOpen = false;
    this.confirm = confirm;
  }

  answer(ok: boolean): void {
    const confirm = this.confirm;
    this.confirm = null;
    if (ok) confirm?.onConfirm();
  }

  setAppearance(change: Partial<Appearance>): void {
    this.appearance = { ...this.appearance, ...change };
    applyAppearance(this.appearance);
    saveAppearance(this.appearance);
  }

  openMeal(index: number): void {
    const meal = ENTITIES.feedTimes[index];
    const date = ENTITIES.mealDates[index];
    if (!meal) return;
    this.menuOpen = false;
    this.draft = { index, time: this.mealTimeValue(meal), date: (date && this.str(date)) || "" };
  }

  editDraft(change: Partial<MealDraft>): void {
    if (this.draft) this.draft = { ...this.draft, ...change };
  }

  /** "12:40 PM" when the lid closes if the pet never arrives, null when it waits indefinitely */
  get draftEndText(): string | null {
    const timeout = this.num(ENTITIES.arrivalTimeout);
    const minutes = parseTimeToMinutes(this.draft?.time);
    if (!Number.isFinite(timeout) || timeout < 0 || minutes === null) return null;
    // with no arrival timeout the lid closes once the feeding time is over
    const open = timeout > 0 ? timeout : this.feedingMinutes;
    return timeFormat.format(atLocalTime(0, ((minutes + open) % (24 * 60)) * 60));
  }

  /** How long the lid stays open for a meal, per the arrival timeout and feeding time settings */
  get draftLidText(): string {
    const eat = this.numText(ENTITIES.minimumFeedingTime, "minute");
    if (this.num(ENTITIES.arrivalTimeout) > 0) {
      const wait = this.numText(ENTITIES.arrivalTimeout, "minute");
      return `The lid waits up to ${wait} for your pet, then stays open ${eat} once they arrive.`;
    }
    return `The lid stays open ${eat}, whether or not your pet comes.`;
  }

  /** How often the schedule repeats with the draft's date */
  get draftPeriodText(): string {
    const draft = this.draft;
    const days = ENTITIES.mealDates.map((date, i) =>
      parseDateToDay(i === draft?.index ? draft.date : this.str(date)),
    );
    const today = dayNumber(new Date());
    const known = days.map((d) => d ?? today);
    const period = Math.max(...known) - Math.min(...known) + 1;
    if (period === 1) return "All meals are on one day, so this schedule repeats daily.";
    return `Meals span ${period} days, so this schedule repeats every ${period} days.`;
  }

  /** Saves the sheet's meal time and date */
  saveDraft(): void {
    const draft = this.draft;
    if (!draft) return;
    const meal = ENTITIES.feedTimes[draft.index];
    const date = ENTITIES.mealDates[draft.index];
    if (!meal) return;
    const timeChanged = parseTimeToMinutes(draft.time) !== null && draft.time !== this.mealTimeValue(meal);
    if (timeChanged) void this.setValue(meal, draft.time + ":00");
    if (date && draft.date && draft.date !== this.str(date)) void this.setValue(date, draft.date);
    this.draft = null;
  }
}

customElements.define("esp-app", PlaRemote);
