# BabeOnym Figma Design Reference

The primary BabeOnym design file is:

https://www.figma.com/design/yGHDT7u3HvHdAc51zeQmFq/BabeOnym?node-id=205-4307&m=dev

The prototype entry point is:

https://www.figma.com/proto/yGHDT7u3HvHdAc51zeQmFq/BabeOnym?node-id=205-4307

## File And Node IDs

- File key: `yGHDT7u3HvHdAc51zeQmFq`
- Linked node: `205:4307`
- Linked node name: `Compositions`
- Top-level pages:
  - `62:332` - `OLD Pages and Assets`
  - `0:1` - `Wireframes`

The linked `Compositions` node is a canvas/page container with zero visual size. For implementation work, inspect one of its visible child frames rather than asking Figma for design context on `205:4307` directly.

## Local Figma File

- Downloaded Figma archive: `docs/BabeOnym.fig`
- Exported at: `2026-08-19T22:16:21.893Z`
- Archive contents: `canvas.fig`, `thumbnail.png`, `meta.json`, and embedded `images/` assets.

The local `.fig` file is a zip-style Figma archive. Its `meta.json` is readable and confirms the file name, export timestamp, background color, thumbnail size, and canvas bounds. The main `canvas.fig` payload is Figma's binary `fig-kiwi` canvas format, so it is not directly readable as JSON or CSS with ordinary local tools. The embedded image assets can be extracted and inspected, but they are not a full layer tree or frame export.

For frame-by-frame design review, use Figma itself, exported screenshots/PDFs, or node-specific API reads when the Figma connector can resolve the node.

## Style Guide PDF

- Downloaded PDF: `docs/BabeOnym - Style Guide.pdf`
- Title: `BabeOnym 2026 Style Guide`
- Page count: `31`
- Page size: `1920px` by `1080px`

The PDF is the most complete static source for the design system. Its table of contents is:

- Visual Identity: pages 3-5
- Color Palettes: pages 6-10
- Type System: pages 11-15
- Buttons + Links: pages 16-21
- Forms: pages 22-30

Key additions from the PDF:

- League Spartan is the primary and only brand typeface described in the guide.
- Desktop type scale: H1 League Spartan Bold `80px`, H2 Semibold `60px`, H3 Semibold `32px`, B1 Regular `20px`.
- Tablet type scale: H1 `70px`, H2 `55px`, H3 `32px`, B1 `20px`.
- Mobile type scale: H1 `36px`, H2 `28px`, H3 `24px`, B1 `16px`.
- Light-mode extra colors: button hover `#5E227A`, second button hover `#A946D6`, plus existing default/light/selected purple tokens.
- Dark-mode extra colors: background black `#292929`, white text `#F5F5F5`, button gradients `#B71DFF` to `#C54EFC`, hover gradients `#C444FF` to `#D989FF`, and hover purple `#CD6BFA`.
- Pink-mode extra colors: button red `#A60F51`, button red hover `#A60F51`, secondary hover `#F45994`, and text-link hover `#F4357E`.
- Blue-mode extra colors: button blue `#0042BC`, button blue hover `#0042BC`, secondary hover `#4E8CFF`, and text-link hover `#216EFF`.
- Buttons + Links section documents primary button, secondary/name buttons, delete icon pairing, `Add Custom Name`, `Set Filters`, text-link hover, and tutorial icon on/off hover states.
- Forms section documents the create-invite-link form, link-copy form, account settings rows, theme swatches, and desktop/tablet layout treatment.

## Compositions PDF

- Downloaded PDF: `docs/BabeOnym - Compositions.pdf`
- Page count: `63`
- Page size: `1158px` by `511px`

The compositions PDF is the most useful static source for full screen and flow implementation. It includes design-system fragments and app screens in a frame-by-frame export:

- Light-mode palette tokens and isolated primary button states.
- Full `Your Names` screens with saved-name pills, delete icon buttons, `Compare Names`, `Invite Voters`, and `Add Custom Name` actions.
- `Compare Names` screen with two large selected names, an `OR` separator, remaining name options, vote counters, and a `Return to List` action.
- Typeface library page from the older composition file. Note: this still references Instrument Sans for Button 3/4, while the newer style guide PDF says League Spartan is the only brand typeface.
- `Create Invite Link` screen with custom URL field, info icon, optional message textarea, `0/50` character counter, link-duration dropdown, and submit action.
- `Link Created!` confirmation screen with explanatory copy, copy-link field/button pair, and `Return to Your Names` action.
- `Your Names` add-custom-name state with input plus `Add Name` button.
- Choice-history table states for user and voter vote summaries.

Use this PDF for flow layout and screen composition; use the `BabeOnym 2026 Style Guide` PDF for authoritative brand tokens and component rules when the two differ.

## Responsive Layout PDFs

- Tablet layout PDF: `docs/BabeOnym - Tablet Light Mode Layout.pdf`
  - Page count: `16`
  - Page size: `1158px` by `511px`
- Mobile layout PDF: `docs/BabeOnym - Mobile Light Mode Layout.pdf`
  - Page count: `19`
  - Page size: `1158px` by `511px`
- Name generator animation PDF: `docs/BabeOnym - Name Generator Animation.pdf`
  - Page count: `15`
  - Page size: `1158px` by `511px`

Responsive implementation notes from these PDFs:

- Tablet `Your Names` keeps desktop-style header/navigation, uses a wider content layout, and can show `Your Choice History` and `Voter's History` side by side.
- Mobile includes a full-screen purple navigation overlay with a close icon, links for `Name Generator`, `Name List`, and `Account`, plus tutorial-mode prompt copy.
- Mobile name generator uses icon-based approve/snooze/reject actions instead of the desktop text-button row.
- Mobile name generator places the filter panel below the primary generator actions, with centered filter fields and a `Set Filters` button.
- Mobile header uses centered BabeOnym branding and a hamburger menu.
- The animation PDF includes isolated name-card/name-transition frames with a dashed bounding box, useful for scoping candidate-name animation behavior.

## Key Frames

- `237:437` - `Homepage_Light Mode`
- `253:3297` - `Homepage_Dark Mode`
- `237:275` - `Homepage_Pink Mode`
- `237:356` - `Homepage_Blue Mode`
- `253:1537` - `Homepage_AccountSettings_Light Mode`
- `253:1148` - `Typeface Library`

The `Compositions` canvas also includes `Your Names` / name-choice chart screens and small component studies for approve buttons, filter buttons, and name buttons.

## Local Screenshot References

- `docs/Tablet_Homepage_Lightmode.jpg` - tablet-width light-mode homepage reference.
- `docs/Dark_Mode_Design_Overview.png` - dark-mode overview of multiple product screens, component samples, and flow states.
- `docs/Light_Mode_State_Overview.png` - panoramic overview of light-mode screens, theme variants, auth/account states, and component samples.

The tablet screenshot preserves the same core homepage structure as `237:437`, but is useful for responsive implementation decisions:

- Header remains two-tiered, with logo and account link above the purple nav.
- Left filter drawer stays visible and occupies roughly one quarter of the viewport width.
- Main generator area stays centered in the remaining space.
- The action buttons remain in one horizontal row.
- The tutorial/help icon remains fixed near the lower-right corner.
- Drawer fields and approved-name preview use compact spacing so the drawer stays usable at tablet width.

The dark-mode overview is useful for documenting flows that are not all visible in the readable Figma child-frame metadata:

- Color swatches and component samples for button variants.
- Dark-mode name generator homepage with filter drawer.
- `Your Names` list states with name pills, delete affordances, and action buttons.
- `Your Names` states with one or two name-choice history charts.
- `Compare Names` state with two selected names, an `OR` separator, grouped remaining names, and a return action.
- Invite flow screens: create invite link, optional message, duration selector, link-created confirmation, copy link action, and return action.
- Add custom name state with text input plus `Add Name`.
- Create-account screen with Google and Microsoft sign-in actions.
- Dark-mode account settings screen with profile rows and theme swatches.
- Approval milestone modal, shown as `You Approved 10 names!`, with account creation as the next action.

The light-mode state overview is a very wide panoramic export, so use it as a state inventory rather than a pixel-measurement source. It shows:

- BabeOnym splash/brand screen.
- `Table of Contents` / screen-map style reference.
- Account setup and sign-in flows.
- First/last-name and theme-selection account forms.
- `Name Generator` across light, pink, and blue theme variants.
- `Your Names` / saved names layouts and controls.
- Theme-change confirmation/state examples.
- Tooltip/tutorial states and small modal examples.
- Dark and light component samples for name buttons, lists, forms, and theme swatches.
- Closing/end brand screen.

## Light Homepage CSS Export Notes

The pasted Figma CSS export for `Homepage_Light Mode` confirms these desktop reference values:

- Frame size: `1440px` by `1086px`, white background.
- Top header: `64px` tall, white background.
- Navigation bar: `64px` tall, starts at `top: 64px`, primary purple `#7B00B4`.
- Filter drawer surface: `337px` wide, extends slightly beyond the frame at `left: -16px`, `top: -12px`, height `1110px`, lavender `#EED7FF`, shadow `0 4px 10px rgba(123, 0, 180, 0.5)`.
- Brand logo block: `148px` by `26px`, positioned at `left: 34px`, `top: 23px`.
- Account link: `20px` League Spartan regular, purple `#5E227A`, at the top right.
- Page title: `Name Generator`, League Spartan bold `80px`, centered in the main content area around `top: 245px`.
- Candidate name: `Xavier`, League Spartan semibold `60px`, centered below the title around `top: 400px`.
- Generator action buttons: each `243px` by `97px`, white fill, `2px` border `#5E227A`, `20px` radius, shadow `0 4px 4px rgba(94, 34, 122, 0.5)`, button text `32px` League Spartan regular.
- Drawer heading: `Name Filters`, League Spartan semibold `32px`, positioned near `left: 36px`, `top: 166px`.
- Drawer labels: `Gender`, `Era`, and `Culture`, `12px` regular label text.
- Drawer controls: roughly `251px` wide; gender select is `38px` tall, era and culture controls are about `33px` to `35px` tall.
- `Set Filters` button: `132px` by `37px`, purple `#5E227A`, `20px` radius, `16px` League Spartan regular text in `#F5F5F5`.
- Approved section heading: League Spartan semibold `32px`; approved names use League Spartan regular `20px`.
- Approved link: `View Full Name List`, League Spartan regular `14px`, purple `#5E227A`, underlined.
- Tutorial/help icon: `125px` circular button, primary purple `#7B00B4`, positioned near the lower-right corner.

When implementing from this export, treat the values as desktop reference measurements. Prefer responsive layout primitives, theme tokens, and existing components over copying absolute positioning directly.

## Main Product Surfaces

### Name Generator

The homepage frames define the core app surface:

- Fixed top header with the BabeOnym logo on the left and an account link on the right.
- Purple navigation bar below the header with `Name Generator` and `Your Names`.
- Left filter drawer with `Name Filters`, gender, era, culture, a `Set Filters` button, and an approved-name preview.
- Centered generator content with a large `Name Generator` title, current candidate name, and three action buttons: `Approve`, `Snooze`, and `Reject`.
- Floating tutorial/help icon in the lower-right corner.

The light-mode frame uses `Xavier` as the sample generated name and `Dylan`, `Ethan`, and `Trevor` as sample approved names.

### Account Settings

The account settings frame defines:

- Shared header and navigation.
- Centered `Account Settings` page title with a horizontal divider.
- Stacked account rows for first name, email address, last name, and color theme.
- Theme color swatches for the available visual themes.
- `Save Changes` and `Delete Account` outline buttons.

### Your Names

The compositions include saved-name list screens with:

- A `Your Names` heading.
- Approved-name pills or buttons with adjacent delete icons.
- Actions for `Compare Names`, `Invite Voters`, and `Add Custom Name`.
- Name-choice history charts for user and voter histories.

## Typography

The Figma typeface library documents these styles:

- Heading 1: League Spartan Bold, `80px`
- Heading 2: League Spartan Semibold, `60px`
- Heading 3: League Spartan Semibold, `32px`
- Body 1: League Spartan Regular, `20px`
- Body 2: League Spartan Light, `24px`
- Body 3: League Spartan Light, `14px`
- Button 1: League Spartan Regular, `32px`
- Button 2: League Spartan Regular, `24px`
- Button 3: Instrument Sans Regular, `16px`
- Button 4/link: Instrument Sans Regular, `14px`

The current frontend already uses League Spartan and maps closely to these values through its MUI theme. Prefer the existing theme variants before adding new typography rules.

## Theme Notes

The Figma frames line up with the app's existing themes:

- Light mode: purple primary, pale lavender drawer surfaces, white page background.
- Dark mode: same layout with dark background treatment.
- Pink mode: pink/lavender theme treatment.
- Blue mode: blue theme treatment.

Use the frontend theme tokens and CSS variables instead of hard-coded Figma hex values whenever possible. See the root style guide at `../doc/frontend-style-guide.md` from the monorepo root for current token names and implementation direction.

## Implementation Notes

- This app is React, TypeScript, Vite, MUI, and local CSS. Do not introduce Tailwind from Figma-generated code.
- Treat Figma-generated React/Tailwind output as reference only. Convert layout and states into existing MUI components, theme tokens, and component CSS.
- Reuse existing surfaces where possible: `Header`, `TopBar`, `NavBar`, `NameGenerator`, filter drawer components, shared buttons, and approved-name chip/list components.
- Preserve the design intent rather than absolute canvas coordinates. The Figma frames are desktop-first fixed-size compositions; production implementation should remain responsive.
- For Figma assets such as the logo or tutorial icon, use the existing committed frontend assets first. Figma asset URLs are temporary and should not be committed as permanent dependencies.

## Related Local Documentation

The monorepo-level style guide captures the same direction in implementation terms:

`../doc/frontend-style-guide.md`
