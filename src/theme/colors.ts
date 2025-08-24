// Single source of truth for colors used across the app
export const colors = {
  white: "#ffffff",
  black: "#1f1f1f",
  info: "#7cc4ff",      // chips / today border
  success: "#35d399",
  danger: "#ff6b6b",

  // Contextual
  weekend: "#e38a8a",

  primary: "#f2a900", 
  secondary: "#0b122011",
  surface: "rgba(255,255,255,0.04)",
  surfaceBorder: "rgba(255,255,255,0.06)",
  surfaceTrack: "rgba(255,255,255,0.08)",
  bg: "#000",
  text: "#ffffff",
  textSecondary: "#b9c2d3",
};

export type AppColors = typeof colors;
