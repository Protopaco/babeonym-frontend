/* The JS half of the breakpoints in src/styles/breakpoints.css. Those are
   @custom-media rules resolved at build time by postcss, so nothing can read
   them at runtime — a query needed in both places has to be written twice, and
   this is where the second copy lives so the pair can be kept in step.

   TOUCH_POINTER is --touch. */
export const TOUCH_POINTER = '(pointer: coarse)';
