# Stream Approved Name Updates With SSE

## Goal

Keep the approved names list synchronized with backend ranking changes by streaming canonical approved-name updates to the frontend.

## Requirements

- Add a backend Server-Sent Events endpoint for approved given names.
- Scope streamed updates to the current customer/session.
- Keep vote, add, and delete actions as normal API requests.
- Push an updated approved names payload whenever approved names or their rankings change.
- Update the frontend given-name provider from streamed approved-name payloads.
- Ensure compare rankings rerender and animate from provider updates.
- Handle stream reconnects and backend errors gracefully.

## Likely Implementation Areas

- Backend given-name routes.
- Backend customer/session lookup utilities.
- Backend approved given-name query path.
- Frontend given-name provider.
- Frontend API/client utilities for streaming updates.
- Compare names rankings component behavior.

## Out Of Scope

- WebSocket infrastructure.
- Frontend reimplementation of ranking math.
- Blocking vote interactions while ranking updates stream.
- Compare interaction polish beyond responding to updated approved-name data.

## Notes

- The backend should remain the source of truth for rating and ranking order.
- The compare vote flow can continue to optimistically advance to the next random pair.
- The stream should let ranking updates arrive opportunistically, including cases where several vote outcomes are reflected in one approved-name update.
