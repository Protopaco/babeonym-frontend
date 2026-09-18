// The app's corner radii, read by component CSS from the custom properties that
// palette.theme.ts spreads into :root.
//
// Rounded rectangles are named for their pixel value, the same as the motion
// durations and for the same reason: a number always has an obvious place to
// go, where a semantic scale forces a decision about what sits between two
// names.
//
// Fully rounded ends are named for their shape instead. A pill is any radius of
// half the height or more, so one oversized value rounds every pill to its own
// height — the element's height can change without its radius following.

const radius = {
  cssVariables: {
    '--radius-2': '2px',
    '--radius-4': '4px',
    '--radius-8': '8px',
    '--radius-12': '12px',
    '--radius-16': '16px',
    '--radius-20': '20px',

    '--radius-pill': '9999px',
    '--radius-circle': '50%',
  },
} as const;

export default radius;
