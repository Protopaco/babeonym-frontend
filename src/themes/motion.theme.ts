// The app's animation durations and easing, defined once and consumed from both
// sides: motion/react reads `durationSeconds` and `ease`, component CSS reads
// the custom properties that palette.theme.ts spreads into :root.
//
// Durations are named for their millisecond value rather than for a role. A
// semantic scale forces a decision every time a value is added — what sits
// between "fast" and "base" — while a number always has an obvious place to go.
// The cost is that the name says what a value is, not when to reach for it, so
// that guidance lives here:
//
//   120   a fade paired with a longer movement, so it resolves first and the
//         movement does not smear
//   180   an element settling into place, or a drawer sliding out
//   300   content being swapped for other content
//   1400  a skeleton pulse, which loops rather than resolving
//
// Each value is written twice, once per consumer. There is no drift risk: the
// name states the value, so a mismatch is visible on the line it happens on.
//
// Travel distance is deliberately not tokenized. It scales with the size of the
// thing moving, so 4px is right for a chip settling into a list for the same
// reason 88px is right for a name being swapped out.
//
// Springs are not tokenized either. A spring has no duration — it is defined by
// stiffness and damping and runs until it settles — so it cannot consume any of
// these. WorkspaceApprovedNameItem uses one because it is a layout-animated
// list item, and a spring absorbs interruption without jerking when the list
// reorders mid-animation.

const motion = {
  // motion/react takes seconds.
  durationSeconds: {
    120: 0.12,
    180: 0.18,
    300: 0.3,
    1400: 1.4,
  },

  // motion/react's easing keywords, which are spelled differently from CSS.
  ease: {
    out: 'easeOut',
    inOut: 'easeInOut',
  },

  // Spread into the :root block in palette.theme.ts alongside the other
  // non-color tokens, so CSS gets the same values without restating them.
  cssVariables: {
    '--motion-duration-120': '120ms',
    '--motion-duration-180': '180ms',
    '--motion-duration-300': '300ms',
    '--motion-duration-1400': '1400ms',

    '--motion-ease-out': 'ease-out',
    '--motion-ease-in-out': 'ease-in-out',
  },
} as const;

export default motion;
