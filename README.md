# Babeonym frontend

The React app for [Babeonym](https://www.babeonym.com), which helps parents choose a baby name by comparing names two at a time.

Babeonym is three repositories:

- **babeonym-frontend**: this app.
- [babeonym-backend](https://github.com/Protopaco/babeonym-backend): the API.
- [babeonym-setup](https://github.com/Protopaco/babeonym-setup): the PostgreSQL schema and the pipeline that builds the name data.

## What it does

- Deals out names to consider, filtered by what the parents care about.
- Keeps the names they like and lets them add their own.
- Ranks their list by asking them to choose between two names at a time.
- Works as a guest from the first visit, and offers Google sign-in to keep progress.
- Adapts to phones, tablets and desktops, with light and dark themes.

## Built with

React 19, TypeScript, Vite, MUI, React Router, and Motion for animation. The API client is generated from the backend's OpenAPI spec. Tested with Vitest and Testing Library. Hosted on Vercel.

## Running it

1. Run [babeonym-backend](https://github.com/Protopaco/babeonym-backend).
2. Copy `.env.example` to `.env` and set `VITE_API_BASE_URL` to the backend's address.
3. `npm install`
4. `npm run dev`

`npm run api:gen` regenerates the API client in `src/api/generated` from a backend running locally on port 2221.

## Tests

```
npm test
```

## Layout

- `src/pages`: one folder per page.
- `src/components`: the components, grouped by the part of the app they belong to.
- `src/state`: one React context per area of state, with its reducer and hooks.
- `src/api`: the API client, with the generated part in `src/api/generated`.
- `src/themes` and `src/styles`: the MUI themes and the shared breakpoints.
- `docs`: the frontend architecture rules and the design files.
