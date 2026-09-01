# React Frontend Engineering

**One function and one export per file.**

Use these rules when implementing, reviewing, or refactoring React frontend code. Do not ignore them unless given express approval.

## Component Responsibility

- One component should do one clear thing.
- Page components may compose sections, but should not hide large render branches or unrelated UI details inside helper functions.
- Split by responsibility:
  - UI section -> component
  - reusable behavior -> hook
  - pure transformation -> helper
  - shared contract -> type/model file following project convention
- Any function over 50 lines must trigger a refactor review. Do not automatically split every function, but pause and evaluate whether a component, hook, or helper would make the code clearer.

## State Design Boundary

- Do not go beyond the approved state design.
- If the approved design distinguishes local, global, URL-backed, server-backed, draft, or committed state, preserve that boundary exactly.
- If implementation reveals that current components cannot support the approved state boundary, stop and report the conflict instead of redesigning the state model or replacing UI patterns.
- Do not introduce new state containers, new flows, replacement controls, or alternate interaction models unless explicitly approved.

## Styling Ownership

- Components own their visual styling.
- Every `.tsx` component must have a sibling `.css` file, even if that CSS file is empty. If a component exists, its styling home must also exist.
- Parents own placement and layout only.
- Use `display: flex` as the default layout primitive.
- Do not use `display: grid` unless the user explicitly approves grid for that specific implementation.
- Avoid mixing flex and grid casually across the app; prefer consistent flex-based layouts unless grid has been approved for a clear reason.
- Do not style a child component's internals from a parent stylesheet.
- Do not use parent selectors such as `.parent .child-component` to change a child component's visual design unless the user explicitly approves that exception.
- If a shared component needs a visual variation, add a named prop or variant to the shared component API.
- Keep component variants explicit and intentional, such as `size="wide"` or `variant="compact"`.

## Theme Tokens

- Never hardcode colors in React component or page CSS.
- Use semantic theme tokens only: CSS variables, theme palette values, or project-defined design tokens.
- Do not use raw hex, RGB/RGBA, HSL/HSLA, named colors, or opacity-suffixed literals in component CSS.
- If a needed color token does not exist, stop and propose adding a semantic token.
- Shadows, border colors, focus colors, and generated alpha colors should also come from theme tokens.
- Typography, radius, spacing, sizing, and motion values that represent design-system decisions should come from tokens or component-owned variants when the project has token support.

## Existing Patterns

- Inspect existing component contracts and CSS before using or modifying a component.
- Reuse established shared components before creating new UI styling.
- Prefer direct component file imports over component-folder barrel exports unless the codebase already uses barrels for that area or Paul explicitly approves one. For example, import `@/components/Header/AccountLink/AccountLink` instead of adding `@/components/Header/AccountLink/index.ts` for convenience.
- Do not use a prop, slot, or layout affordance merely because it exists. Confirm it matches the design intent.
- When using MUI, ensure component-owned CSS has enough specificity to beat default MUI styles, for example `.component-class.MuiButton-root`.

## Responsive Behavior

- Put responsive visual behavior in the component when it belongs to that component.
- Put responsive placement/layout behavior in the parent when it only affects where the component sits.
- Avoid solving mobile/desktop differences by leaking component styling into parent CSS.

## Before Editing UI

Before making UI changes, state:

- the intended placement,
- which component owns the visual styling,
- which parent owns layout only,
- whether a new component variant is needed,
- files to inspect and files to modify.

Stop and ask when design ownership or placement is ambiguous.
