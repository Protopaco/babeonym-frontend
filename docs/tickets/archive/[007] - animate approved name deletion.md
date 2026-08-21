# Animate approved name deletion

Add a subtle exit animation when deleting an approved/saved name from the drawer or future saved-name screens.

Candidate behavior:
- Fade the chip out quickly.
- Add a slight left translation so the deletion feels intentional.
- Keep the duration short, roughly 160-220ms.
- Remove the name from state only after the exit animation completes if that can be done cleanly.

Constraints:
- Preserve the current hover trash drawer behavior.
- Prefer implementing in the shared `ApprovedGivenNameChip` so the drawer and future saved-name screens stay consistent.
- Keep the motion subtle and responsive; avoid anything theatrical.
