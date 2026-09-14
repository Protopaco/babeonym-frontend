// Passed to the first createTheme call in every theme, not only merged in later.
// MUI writes the font family into each typography variant as the theme is
// built, so a family merged over a finished theme reaches the top-level value
// but none of the variants Typography and CssBaseline read.
export const FONT_FAMILY = '"League Spartan", system-ui, sans-serif';
