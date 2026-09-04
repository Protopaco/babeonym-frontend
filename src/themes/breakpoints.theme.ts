// MUI's default values, declared explicitly so the JS side states its
// breakpoints rather than inheriting them from a library default.
//
// Component CSS cannot read these — a media query condition sits outside the
// cascade, so it cannot resolve a custom property. The same tiers are declared
// for CSS in src/styles/breakpoints.css and must be changed in both places.
const breakpoints = {
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
};

export default breakpoints;
