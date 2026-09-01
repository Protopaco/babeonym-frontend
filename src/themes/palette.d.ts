import '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    selected: { main: string };
    swatch: { main: string };
  }

  interface PaletteOptions {
    selected?: { main: string };
    swatch?: { main: string };
  }
}
