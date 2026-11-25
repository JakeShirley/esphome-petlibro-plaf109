export interface Accent {
  id: string;
  name: string;
  tint: string;
  plate: string; // meal compartments
  plateDark: string; // the highlighted compartment
}

export const ACCENTS: readonly Accent[] = [
  { id: "blue", name: "System Blue", tint: "#0088ff", plate: "#ecc9a4", plateDark: "#c99a6b" },
  { id: "tan", name: "Petlibro Tan", tint: "#b07d52", plate: "#e6c3a0", plateDark: "#b07d52" },
  { id: "cocoa", name: "Cocoa", tint: "#d9a072", plate: "#c98f63", plateDark: "#e6b088" },
  { id: "arctic", name: "Arctic", tint: "#0a84c6", plate: "#9fd0ee", plateDark: "#3a9ad3" },
  { id: "sage", name: "Sage", tint: "#4f7d55", plate: "#b5cdaa", plateDark: "#6f9a68" },
  { id: "pink", name: "Pink", tint: "#ff2d55", plate: "#f8b8c6", plateDark: "#e9798f" },
  { id: "indigo", name: "Indigo", tint: "#6155f5", plate: "#8e8cf0", plateDark: "#6155f5" },
  { id: "graphite", name: "Graphite", tint: "#8e8e93", plate: "#c7c7cc", plateDark: "#8e8e93" },
];

export type ColorScheme = "system" | "light" | "dark";

export interface Appearance {
  accent: string; // Accent id
  scheme: ColorScheme;
}

const STORAGE_KEY = "plaf109.appearance";
const DEFAULT: Appearance = { accent: "blue", scheme: "system" };

export function accentOf(appearance: Appearance): Accent {
  return ACCENTS.find((a) => a.id === appearance.accent) ?? (ACCENTS[0] as Accent);
}

/** Saved per browser, as the firmware has no entity for it */
export function loadAppearance(): Appearance {
  try {
    const saved: Partial<Appearance> = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "{}");
    return { ...DEFAULT, ...saved };
  } catch {
    return DEFAULT;
  }
}

export function saveAppearance(appearance: Appearance): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(appearance));
  } catch {
    // private browsing, the setting just won't persist
  }
}

export function applyAppearance(appearance: Appearance): void {
  const root = document.documentElement;
  const accent = accentOf(appearance);
  root.style.setProperty("--tint", accent.tint);
  root.style.setProperty("--plate", accent.plate);
  root.style.setProperty("--plate-d", accent.plateDark);
  if (appearance.scheme === "system") delete root.dataset.theme;
  else root.dataset.theme = appearance.scheme;
}
