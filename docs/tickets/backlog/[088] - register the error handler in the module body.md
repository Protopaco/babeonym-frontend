# [088] - Register The Error Handler In The Module Body

## Status

Backlog

## Summary

`mapErrorResponse` is registered from inside the `server.listen` callback rather
than from the module body. It currently ends up in the right place, but by
timing rather than by construction.

## Context

`app.ts` reads roughly:

```ts
const server = app.listen(PORT, HOST, () => {
  logger.info(...);
  app.use(mapErrorResponse);   // line 210
});

app.use(passport.initialize());
app.use(passport.session());

app.use(`${basePath}/v1/auth/`, globalRateLimit, authRoute);   // 215 onward
...
```

Express requires an error handler to be registered *after* the routes it
catches for, and it is — but only because of the order things run in. `listen`
returns immediately and its callback fires on a later tick, so the whole
synchronous tail of the module, routers included, has already run by the time
line 210 executes.

That is the correct order arrived at by accident. Anything that changed the
timing would move the handler ahead of the routes and Express would stop routing
errors to it, silently: `mapErrorResponse` maps Postgres error codes to statuses,
so the visible symptom would be unique-violation and foreign-key errors
surfacing as bare 500s instead of 409s and 400s. Nothing would log that the
handler had been skipped.

It is also simply misleading to read. A reader tracing middleware order down the
file sees the error handler first and the routes after, which is the reverse of
what actually happens.

## Open Questions

- Whether anything else in the listen callback depends on running after the
  routers. It reads as though only the logging does, but that should be checked
  rather than assumed.

## Implementation Notes

- `src/app.ts:206-211` is the `listen` call and its callback.
- `src/app.ts:215-220` is the router registration block.
- The fix is to move `app.use(mapErrorResponse)` out of the callback and below
  the last `app.use(...Route)` line.
- `src/middleware/mapErrorResponse.ts` is the handler itself; it is not being
  changed, only where it is attached.

## Acceptance Criteria

- `mapErrorResponse` is registered in the module body, after every router.
- The `listen` callback contains only what genuinely belongs there.
- A request that triggers a unique violation still returns 409 rather than 500.

## Out Of Scope

- Changing what `mapErrorResponse` maps.
- Any other reordering of middleware in `app.ts`.
