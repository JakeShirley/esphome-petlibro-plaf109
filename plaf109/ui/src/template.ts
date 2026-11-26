import thermometerIcon from "@material-symbols/svg-400/rounded/device_thermostat-fill.svg";
import ledIcon from "@material-symbols/svg-400/rounded/backlight_high-fill.svg";
import batteryChargingIcon from "@material-symbols/svg-400/rounded/battery_charging_full-fill.svg";
import batteryIcon from "@material-symbols/svg-400/rounded/battery_full-fill.svg";
import checkIcon from "@material-symbols/svg-400/rounded/check.svg";
import closeIcon from "@material-symbols/svg-400/rounded/close.svg";
import contrastIcon from "@material-symbols/svg-400/rounded/contrast-fill.svg";
import feedingTimeIcon from "@material-symbols/svg-400/rounded/cookie-fill.svg";
import lidIcon from "@material-symbols/svg-400/rounded/earbud_case.svg";
import errorIcon from "@material-symbols/svg-400/rounded/error-fill.svg";
import mealOverlapIcon from "@material-symbols/svg-400/rounded/event_busy-fill.svg";
import helpIcon from "@material-symbols/svg-400/rounded/help.svg";
import feederIcon from "@material-symbols/svg-400/rounded/home.svg";
import longTimeoutIcon from "@material-symbols/svg-400/rounded/hourglass_bottom-fill.svg";
import infoIcon from "@material-symbols/svg-400/rounded/info-fill.svg";
import moreIcon from "@material-symbols/svg-400/rounded/more_horiz.svg";
import coolingFillIcon from "@material-symbols/svg-400/rounded/ac_unit-fill.svg";
import targetIcon from "@material-symbols/svg-400/rounded/nest_farsight_cool-fill.svg";
import chimeIntervalIcon from "@material-symbols/svg-400/rounded/notification_settings-fill.svg";
import chimeIcon from "@material-symbols/svg-400/rounded/notifications.svg";
import chimeTimeoutIcon from "@material-symbols/svg-400/rounded/notifications_paused-fill.svg";
import paletteIcon from "@material-symbols/svg-400/rounded/palette-fill.svg";
import pauseIcon from "@material-symbols/svg-400/rounded/pause.svg";
import playIcon from "@material-symbols/svg-400/rounded/play_arrow.svg";
import powerOffIcon from "@material-symbols/svg-400/rounded/power_off-fill.svg";
import feedIcon from "@material-symbols/svg-400/rounded/restaurant.svg";
import rotateIcon from "@material-symbols/svg-400/rounded/rotate_right.svg";
import scheduleIcon from "@material-symbols/svg-400/rounded/schedule.svg";
import scheduleFillIcon from "@material-symbols/svg-400/rounded/schedule-fill.svg";
import settingsIcon from "@material-symbols/svg-400/rounded/settings.svg";
import arrivalTimeoutIcon from "@material-symbols/svg-400/rounded/timelapse-fill.svg";
import { html, noChange, nothing, type TemplateResult } from "lit";
import { live } from "lit/directives/live.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import plateSvg from "../assets/plate.svg";
import type { PlaRemote, Tab, UpcomingDay } from "./app";
import { ACCENTS, type ColorScheme } from "./appearance";
import { ENTITIES, type Entity } from "./entities";

function icon(raw: string, cls = ""): TemplateResult {
  return html`<span class="ico ${cls}" aria-hidden="true">${unsafeHTML(raw)}</span>`;
}

function sym(raw: string, color: string): TemplateResult {
  return html`<span class="sym" style="background:${color}">${icon(raw)}</span>`;
}

/**
 * The feeder's three-compartment plate
 * @param colorOf compartment color, or null to leave it empty
 */
function plate(remote: PlaRemote, size: string, colorOf: (i: number) => string | null, pick = false): TemplateResult {
  const vars = ENTITIES.feedTimes
    .map((_, i) => {
      const color = colorOf(i);
      return color ? `--plate-fill-${i + 1}:${color};--plate-digit-${i + 1}:#fff;` : "";
    })
    .join("");
  const onClick = (e: Event) => {
    const meal = (e.target as Element).closest("[data-meal]")?.getAttribute("data-meal");
    if (meal) remote.openMeal(Number(meal));
  };
  return html`<div class="plate shrink-0 ${size}" style=${vars} aria-hidden="true" @click=${pick ? onClick : nothing}>
    ${unsafeHTML(plateSvg)}
  </div>`;
}

function banner(
  hidden: boolean,
  color: string,
  iconSvg: string,
  title: string,
  detail: string,
  action?: { label: string; onClick: () => void },
): TemplateResult {
  if (hidden) return html``;
  return html`<div class="banner">
    ${sym(iconSvg, color)}
    <div class="main"><b>${title}</b><span>${detail}</span></div>
    ${action
      ? html`<button class="tag lg press" aria-label="${action.label}: ${title}" @click=${action.onClick}>${action.label}</button>`
      : nothing}
  </div>`;
}

const missedMealBanner = (r: PlaRemote) =>
  banner(r.missedMealReason === null, "var(--red)", errorIcon, "Pet missed a meal", r.missedMealReason ?? "", {
    label: "Clear",
    onClick: () => r.pressButton(ENTITIES.clearMissedMeal),
  });
const batteryBanner = (r: PlaRemote) =>
  banner(!r.onBattery, "var(--orange)", powerOffIcon, "Running on battery", "Cooling is paused until AC power returns.");
const overlapBanners = (r: PlaRemote) => html`
  ${banner(r.mealOverlapError === null, "var(--red)", mealOverlapIcon, "Scheduled meals overlap", r.mealOverlapError ?? "")}
  ${banner(r.mealOverlapWarning === null, "var(--orange)", mealOverlapIcon, "Meals may overlap", r.mealOverlapWarning ?? "")}
`;
const longTimeoutBanner = (r: PlaRemote) =>
  banner(!r.longArrivalTimeout, "var(--orange)", longTimeoutIcon, "Long arrival timeout", "Food may sit out for hours if your pet doesn't come.");

function switchToggle(label: string, checked: boolean, onChange: (e: Event) => void): TemplateResult {
  return html`<input type="checkbox" role="switch" class="sw" aria-label=${label} .checked=${checked} @change=${onChange} />`;
}

function stepper(remote: PlaRemote, entity: Entity, unit: string, label: string, zeroText?: string): TemplateResult {
  const text = remote.numText(entity, unit, zeroText);
  // leave the input alone while typing so a state event doesn't overwrite it
  const inputValue = remote.isEditing(entity) ? noChange : live(text);
  return html`<div class="stepper">
    <button aria-label="Decrease ${label}" ?disabled=${!remote.canStep(entity, -1)} @click=${() => remote.stepNumberEntity(entity, -1)}>−</button>
    <input
      type="text"
      inputmode="decimal"
      enterkeyhint="done"
      autocomplete="off"
      aria-label=${label}
      .value=${inputValue}
      @focus=${(e: Event) => remote.onNumberFocus(e, entity)}
      @keydown=${(e: KeyboardEvent) => remote.onEditKeydown(e)}
      @change=${(e: Event) => remote.onNumberChange(e, entity, unit, zeroText)}
      @blur=${() => remote.onEditBlur()}
    />
    <button aria-label="Increase ${label}" ?disabled=${!remote.canStep(entity, 1)} @click=${() => remote.stepNumberEntity(entity, 1)}>+</button>
  </div>`;
}

function settingCell(remote: PlaRemote, symbol: TemplateResult, label: string, help: string, control: TemplateResult): TemplateResult {
  return html`<div class="cell ic">
    ${symbol}
    <div class="main">${label}${remote.showSettingsHelp ? html`<small>${help}</small>` : nothing}</div>
    ${control}
  </div>`;
}

function moreButton(remote: PlaRemote): TemplateResult {
  return html`<button
    class="gbtn round glass press"
    aria-label="More actions"
    aria-haspopup="menu"
    aria-expanded=${String(remote.menuOpen)}
    @click=${() => remote.toggleMenu()}
  >
    ${icon(moreIcon)}
  </button>`;
}

function periodFooter(remote: PlaRemote): string {
  const upcoming = remote.upcomingMeals;
  if (upcoming.off) return "The schedule is paused, so no meals will be served automatically.";
  return upcoming.periodText === "Daily" ? "Repeats daily." : `Repeats ${upcoming.periodText.toLowerCase()}.`;
}

function feederTab(r: PlaRemote): TemplateResult {
  const next = r.nextMeal;
  const upcoming = r.upcomingMeals.days.flatMap((day) => day.meals.map((meal) => ({ day, meal }))).slice(0, 4);
  const power = r.isOn(ENTITIES.acPower) ? "AC power" : "On battery";
  return html`
    <div class="top">
      <span class="glass flex rounded-[22px]">
        <button class="gbtn round" aria-label="Play chime" @click=${() => r.pressButton(ENTITIES.chime)}>${icon(chimeIcon)}</button>
        <button
          class="gbtn round"
          aria-label="More actions"
          aria-haspopup="menu"
          aria-expanded=${String(r.menuOpen)}
          @click=${() => r.toggleMenu()}
        >
          ${icon(moreIcon)}
        </button>
      </span>
    </div>
    <div class="wash"></div>
    <h1 class="large">${r.deviceTitle}</h1>
    <div class="relative flex items-center gap-4 mx-5">
      ${plate(r, "w-24 h-24", (i) => (i === next.index ? "var(--plate-d)" : null))}
      <div class="min-w-0">
        <div class="flex items-center gap-1.5 text-[13px] text-sec">
          <i class="w-2 h-2 rounded-full ${r.connected ? "bg-green" : "bg-red"}"></i>${r.connLabel}
        </div>
        <div class="text-[15px] mt-1">${r.batteryInstalled ? `${power} · ${r.batteryPctText}` : power}</div>
        <div class="text-[13px] text-sec">Pet ${r.presenceText.toLowerCase()}</div>
      </div>
    </div>
    ${missedMealBanner(r)} ${batteryBanner(r)} ${overlapBanners(r)}
    <div class="tiles">
      <div class="tile">
        <div class="k"><b class="bg-tint"></b>Next meal</div>
        <div class="v">${next.timeText}</div>
        <div class="s">${next.label || "\u00a0"}</div>
      </div>
      <div class="tile">
        <div class="k"><b class="bg-cyan"></b>Chamber</div>
        <div class="v">${r.chamberText}</div>
        <div class="s">${r.isOn(ENTITIES.cooling) ? `Cooling to ${r.coolingTargetText}` : "Cooling off"}</div>
      </div>
      <div class="tile">
        <div class="k"><b class="bg-green"></b>Visits</div>
        <div class="v">${r.stateText(ENTITIES.visitCount)}</div>
        <div class="s">${r.totalVisitText} total</div>
      </div>
      <div class="tile">
        <div class="k"><b class="bg-orange"></b>Last visit</div>
        <div class="v">${r.lastVisitDurationText}</div>
        <div class="s">${r.lastVisitAtText ? `at ${r.lastVisitAtText}` : "\u00a0"}</div>
      </div>
    </div>
    <div class="acts">
      <button class="act" @click=${() => askFeed(r)}><div class="ab">${icon(feedIcon)}</div>Feed</button>
      <button class="act" @click=${() => askRotate(r)}><div class="ab">${icon(rotateIcon)}</div>Rotate</button>
      <button class="act" @click=${() => askLid(r)}><div class="ab">${icon(lidIcon)}</div>${lidActionText(r)}</button>
      <button class="act" @click=${() => r.pressButton(ENTITIES.chime)}><div class="ab">${icon(chimeIcon)}</div>Chime</button>
    </div>
    <h2 class="sec-h big">
      Upcoming
      <button class="tag lg press" @click=${() => r.setTab("schedule")}>Edit</button>
    </h2>
    <div class="group">
      ${upcoming.length === 0
        ? html`<div class="cell"><div class="main text-sec">No upcoming meals</div></div>`
        : upcoming.map(
            ({ day, meal }, i) => html`<div class="cell">
              <span class="mealdot">${meal.index + 1}</span>
              <div class="main">${meal.timeText}<small>${day.title}${meal.countdownText ? ` · ${meal.countdownText}` : ""}</small></div>
              ${i === 0 ? html`<span class="tag">Next</span>` : nothing}
            </div>`,
          )}
    </div>
    <p class="sec-f">${periodFooter(r)}</p>
  `;
}

function upcomingDayCell(day: UpcomingDay): TemplateResult {
  return html`<div class="cell">
    <div class="main">
      <span class=${day.isToday ? "text-tint font-semibold" : ""}>${day.title}</span>
      <small>${day.meals.length ? day.meals.map((m) => m.timeText).join(" · ") : "No meals"}</small>
    </div>
    <span class="flex -space-x-1.5">
      ${day.meals.map((m) => html`<span class="mealdot w-6.5! h-6.5! text-xs! ring-2 ring-[var(--card)]">${m.index + 1}</span>`)}
    </span>
  </div>`;
}

function scheduleTab(r: PlaRemote): TemplateResult {
  const upcoming = r.upcomingMeals;
  const on = r.isOn(ENTITIES.schedule);
  return html`
    <div class="top">${moreButton(r)}</div>
    <h1 class="large">Schedule</h1>
    ${overlapBanners(r)} ${longTimeoutBanner(r)}
    <div class="group mt-2.5">
      <div class="cell ic">
        ${sym(scheduleFillIcon, "var(--green)")}
        <div class="main">Feeding Schedule<small>${on ? upcoming.periodText : "Paused"}</small></div>
        ${switchToggle("Feeding Schedule", on, (e) => r.setSwitch(e, ENTITIES.schedule))}
      </div>
    </div>
    <div class="flex justify-center pt-6 pb-2 ${on ? "" : "opacity-50"}">
      ${plate(r, "w-56 h-56", () => "var(--plate)", true)}
    </div>
    <p class="sec-f text-center">Tap a compartment to change its meal.</p>
    <h2 class="sec-h">Meals</h2>
    <div class="group">
      ${r.meals.map(
        (meal) => html`<button class="cell" aria-label="Edit ${meal.name}" @click=${() => r.openMeal(meal.index)}>
          <span class="mealdot">${meal.index + 1}</span>
          <div class="main">${meal.timeText}<small>${meal.dateText ? `${meal.dateText} · ` : ""}${meal.name}</small></div>
          <span class="chev"></span>
        </button>`,
      )}
    </div>
    <p class="sec-f">${periodFooter(r)}</p>
    ${upcoming.days.length
      ? html`<h2 class="sec-h">Upcoming</h2>
          <div class="group">${upcoming.days.map(upcomingDayCell)}</div>`
      : nothing}
  `;
}

const SCHEMES: { id: ColorScheme; label: string }[] = [
  { id: "system", label: "Auto" },
  { id: "light", label: "Light" },
  { id: "dark", label: "Dark" },
];

function batteryCell(r: PlaRemote): TemplateResult {
  const ac = r.isOn(ENTITIES.acPower);
  return html`<div class="cell ic">
    ${sym(ac ? batteryChargingIcon : batteryIcon, r.batteryLow ? "var(--red)" : "var(--green)")}
    <div class="main">Battery<small>${ac ? "On AC power" : "On battery"}</small></div>
    <span class="val">${r.batteryPctText}</span>
  </div>`;
}

function settingsTab(r: PlaRemote): TemplateResult {
  const accentId = r.appearance.accent;
  return html`
    <div class="top">
      <button
        class="gbtn round glass press ${r.showSettingsHelp ? "on" : ""}"
        aria-label="Help"
        aria-pressed=${String(r.showSettingsHelp)}
        @click=${() => r.toggleSettingsHelp()}
      >
        ${icon(helpIcon)}
      </button>
    </div>
    <h1 class="large">Settings</h1>
    ${missedMealBanner(r)} ${batteryBanner(r)} ${longTimeoutBanner(r)}

    <h2 class="sec-h">Freshness</h2>
    <div class="group">
      <div class="cell ic">
        ${sym(thermometerIcon, "var(--orange)")}
        <div class="main">Chamber</div>
        <span class="val">${r.stateText(ENTITIES.chamberTemp, "-- °F")}</span>
      </div>
      ${settingCell(
        r,
        sym(coolingFillIcon, "var(--cyan)"),
        "Cooling",
        "Keeps the food chamber chilled. Pauses on battery power. Leave on while wet food is loaded.",
        switchToggle("Cooling", r.isOn(ENTITIES.cooling), (e) => r.setCooling(e)),
      )}
      ${settingCell(
        r,
        sym(targetIcon, "#5e5ce6"),
        "Target",
        `The chamber temperature cooling aims for. Minimum ${r.coolingMinText}, colder than that the cooler can't keep up.`,
        stepper(r, ENTITIES.coolingTarget, "°", "Cooling Target"),
      )}
    </div>

    <h2 class="sec-h">Mealtime</h2>
    <div class="group">
      ${settingCell(
        r,
        sym(arrivalTimeoutIcon, "var(--tint)"),
        "Arrival Timeout",
        "How long to wait for your pet once a meal is served. If they don't show up, the lid will close, and the plate won't rotate. Turn off to keep the lid open for the feeding time whether or not your pet comes, then rotate the plate.",
        stepper(r, ENTITIES.arrivalTimeout, "minute", "Arrival Timeout", "Off"),
      )}
      ${settingCell(
        r,
        sym(feedingTimeIcon, "var(--green)"),
        "Feeding Time",
        "Once your pet arrives, how long to keep the lid open. With Arrival Timeout off, counts from when the meal is served instead.",
        stepper(r, ENTITIES.minimumFeedingTime, "minute", "Feeding Time"),
      )}
      ${settingCell(
        r,
        sym(chimeIntervalIcon, "#ff2d55"),
        "Chime Interval",
        "While waiting for your pet, chime again every this many seconds until they arrive. Turn off to chime only once per meal.",
        stepper(r, ENTITIES.chimeInterval, "second", "Chime Interval", "Off"),
      )}
      ${settingCell(
        r,
        sym(chimeTimeoutIcon, "#8e8e93"),
        "Chime Timeout",
        "Stop repeating the chime after this many minutes. The lid stays open, and the meal keeps waiting for your pet. Turn off to chime until they arrive.",
        stepper(r, ENTITIES.chimeTimeout, "minute", "Chime Timeout", "Off"),
      )}
    </div>
    <p class="sec-f" ?hidden=${r.showSettingsHelp}>Tap ? for what each setting does.</p>

    <h2 class="sec-h">Device</h2>
    <div class="group">
      ${settingCell(
        r,
        sym(ledIcon, "#ffcc00"),
        "Status LED",
        "Enable to show a steady white light while everything is fine. Warnings show regardless: red pulse for a missed meal and pulsing white when Wi-Fi is down.",
        switchToggle("Status LED", r.isOn(ENTITIES.statusLed), (e) => r.setSwitch(e, ENTITIES.statusLed)),
      )}
      ${r.batteryInstalled ? batteryCell(r) : nothing}
      <a class="cell ic text-ink no-underline" href="https://github.com/esphome/esphome/releases" target="_blank" rel="noopener">
        ${sym(infoIcon, "#8e8e93")}
        <div class="main shrink-0 whitespace-nowrap">Firmware<small>${r.connLabel}</small></div>
        <span class="val chev max-w-[55%] truncate">${r.firmwareVersionText}</span>
      </a>
    </div>

    <h2 class="sec-h">Appearance</h2>
    <div class="group">
      <div class="cell ic">
        ${sym(paletteIcon, "var(--tint)")}
        <div class="main">Accent Color<small>${ACCENTS.find((a) => a.id === accentId)?.name}</small></div>
      </div>
      <div class="cell grid! grid-cols-8 justify-items-center gap-1! py-3.5" role="group" aria-label="Accent color">
        ${ACCENTS.map(
          (a) => html`<button
            class="swatch press"
            style="background:${a.tint};color:${a.tint}"
            title=${a.name}
            aria-label=${a.name}
            aria-pressed=${String(a.id === accentId)}
            @click=${() => r.setAppearance({ accent: a.id })}
          ></button>`,
        )}
      </div>
      <div class="cell ic">
        ${sym(contrastIcon, "#636366")}
        <div class="main">Mode</div>
        <div class="seg" role="group" aria-label="Mode">
          ${SCHEMES.map(
            (s) => html`<button aria-pressed=${String(r.appearance.scheme === s.id)} @click=${() => r.setAppearance({ scheme: s.id })}>
              ${s.label}
            </button>`,
          )}
        </div>
      </div>
    </div>
    <p class="sec-f">Appearance is saved in this browser.</p>
  `;
}

const TABS: { id: Tab; label: string; icon: string; render: (r: PlaRemote) => TemplateResult }[] = [
  { id: "feeder", label: "Feeder", icon: feederIcon, render: feederTab },
  { id: "schedule", label: "Schedule", icon: scheduleIcon, render: scheduleTab },
  { id: "settings", label: "Settings", icon: settingsIcon, render: settingsTab },
];

function tabBar(r: PlaRemote): TemplateResult {
  return html`<nav class="tabs" aria-label="Sections">
    <div class="tb glass">
      ${TABS.map(
        (t) => html`<button class="t" aria-current=${r.tab === t.id ? "page" : "false"} @click=${() => r.setTab(t.id)}>
          ${icon(t.icon)}${t.label}
        </button>`,
      )}
    </div>
  </nav>`;
}

function askFeed(r: PlaRemote): void {
  r.ask({
    title: "Feed now?",
    text: "Opens the lid and serves the next compartment.",
    action: "Feed",
    onConfirm: () => r.pressButton(ENTITIES.feedNow),
  });
}

function askRotate(r: PlaRemote): void {
  r.ask({
    title: "Rotate plate?",
    text: "Turns the plate to the next compartment.",
    action: "Rotate",
    onConfirm: () => r.pressButton(ENTITIES.rotatePlate),
  });
}

const LID_ACTIONS = {
  unknown: { label: "Toggle Lid", action: "Toggle", text: "Opens the lid if it's closed, or closes it if it's open." },
  open: { label: "Close Lid", action: "Close", text: "Closes the lid. It stays open if your pet is at the feeder." },
  closed: { label: "Open Lid", action: "Open", text: "Opens the lid without serving a meal." },
};

/** "unknown" on firmware without the Lid Open sensor */
function lidAction(r: PlaRemote): (typeof LID_ACTIONS)[keyof typeof LID_ACTIONS] {
  if (!r.hasEntity(ENTITIES.lidOpen)) return LID_ACTIONS.unknown;
  return r.isOn(ENTITIES.lidOpen) ? LID_ACTIONS.open : LID_ACTIONS.closed;
}

function lidActionText(r: PlaRemote): string {
  return lidAction(r).label;
}

function askLid(r: PlaRemote): void {
  const { label, action, text } = lidAction(r);
  r.ask({ title: `${label}?`, text, action, onConfirm: () => r.pressButton(ENTITIES.doorToggle) });
}

function menu(r: PlaRemote): TemplateResult {
  const on = r.isOn(ENTITIES.schedule);
  const item = (label: string, iconSvg: string, onClick: () => void, cls = "") =>
    html`<button role="menuitem" class=${cls} @click=${onClick}>${label}${icon(iconSvg)}</button>`;
  return html`<div class="menu glass" role="menu" aria-label="Actions">
    <div class="t">${r.meals.length} meals · ${on ? r.upcomingMeals.periodText.toLowerCase() : "paused"}</div>
    ${item(on ? "Pause Schedule" : "Resume Schedule", on ? pauseIcon : playIcon, () =>
      on
        ? r.ask({
            title: "Pause schedule?",
            text: "No meals will be served automatically until you resume it.",
            action: "Pause",
            destructive: true,
            onConfirm: () => r.toggleSwitch(ENTITIES.schedule),
          })
        : (r.toggleSwitch(ENTITIES.schedule), r.toggleMenu()),
    )}
    ${item("Rotate Plate", rotateIcon, () => askRotate(r))}
    ${item(lidActionText(r), lidIcon, () => askLid(r))}
    ${r.missedMealReason !== null
      ? html`<hr />
          ${item("Clear Missed Meal", errorIcon, () => (r.pressButton(ENTITIES.clearMissedMeal), r.toggleMenu()), "text-red")}`
      : nothing}
  </div>`;
}

function sheet(r: PlaRemote): TemplateResult {
  const draft = r.draft;
  if (!draft) return html``;
  const name = ENTITIES.feedTimes[draft.index]?.name ?? "";
  const end = r.draftEndText;
  return html`<div class="sheet" role="dialog" aria-modal="true" aria-labelledby="sheet-title">
    <div class="grabber"></div>
    <div class="top">
      <button class="gbtn round glass press" aria-label="Cancel" @click=${() => r.closeOverlays()}>${icon(closeIcon)}</button>
      <h2 class="ttl m-0 text-[17px]" id="sheet-title">${name}</h2>
      <button class="gbtn round prom press" aria-label="Save" @click=${() => r.saveDraft()}>${icon(checkIcon)}</button>
    </div>
    <h3 class="sec-h pt-2">Schedule</h3>
    <div class="group">
      <label class="cell">
        <span class="main">Date</span>
        <input
          type="date"
          class="pick"
          required
          .value=${draft.date}
          @input=${(e: Event) => r.editDraft({ date: (e.target as HTMLInputElement).value })}
        />
      </label>
      <label class="cell">
        <span class="main">Start</span>
        <input
          type="time"
          class="pick"
          required
          .value=${draft.time}
          @input=${(e: Event) => r.editDraft({ time: (e.target as HTMLInputElement).value })}
        />
      </label>
      <div class="cell">
        <span class="main">Lid closes</span>
        <span class="val">${end ?? "--:--"}</span>
      </div>
    </div>
    <p class="sec-f">
      ${end ? r.draftLidText : ""}
      Change these in Settings.
    </p>
    <p class="sec-f">${r.draftPeriodText}</p>
  </div>`;
}

function alertDialog(r: PlaRemote): TemplateResult {
  const c = r.confirm;
  if (!c) return html``;
  return html`<div class="alert glass" role="alertdialog" aria-modal="true" aria-labelledby="alert-title">
    <h2 id="alert-title">${c.title}</h2>
    <p>${c.text}</p>
    <div class="btns">
      <button @click=${() => r.answer(false)}>Cancel</button>
      <button class=${c.destructive ? "dst" : "prom"} @click=${() => r.answer(true)}>${c.action}</button>
    </div>
  </div>`;
}

function toastBox(text: string, info: boolean): TemplateResult {
  return html`<div class="toast glass" aria-hidden="true">
    ${icon(info ? infoIcon : errorIcon, info ? "text-tint" : "text-red")}<span>${text}</span>
  </div>`;
}

function toast(r: PlaRemote): TemplateResult {
  const t = r.toast;
  return html`
    <div class="sr-only" role="status">${t?.info ? t.text : ""}</div>
    <div class="sr-only" role="alert">${t && !t.info ? t.text : ""}</div>
    ${t ? toastBox(t.text, t.info) : nothing}
  `;
}

export function renderTemplate(r: PlaRemote): TemplateResult {
  const tab = TABS.find((t) => t.id === r.tab) ?? TABS[0];
  const overlay = !!(r.draft || r.menuOpen || r.confirm);
  return html`
    <main>${tab?.render(r)}</main>
    ${tabBar(r)} ${toast(r)}
    ${overlay ? html`<div class="dim" @click=${() => r.closeOverlays()}></div>` : nothing}
    ${r.menuOpen ? menu(r) : nothing} ${sheet(r)} ${alertDialog(r)}
  `;
}
