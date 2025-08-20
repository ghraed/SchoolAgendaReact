// Single source of truth for colors used across the app
export const colors = {
  // Base
  bg: "#0b1220",
  text: "#ffffff",
  textMuted: "#b9c2d3",

  // Surfaces
  surface: "rgba(255,255,255,0.04)",
  surfaceBorder: "rgba(255,255,255,0.06)",
  surfaceTrack: "rgba(255,255,255,0.08)",

  // Brand / Accents
  primary: "#f2a900",   // used for bars, highlights
  info: "#7cc4ff",      // chips / today border
  success: "#35d399",
  danger: "#ff6b6b",

  // Contextual
  weekend: "#e38a8a",
};

export type AppColors = typeof colors;
