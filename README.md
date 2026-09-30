# Movies App

React + Vite implementation of the Movies App assessment.

## Run

```bash
npm install
npm run dev
```

## Routes

- `/login`
- `/`
- `/popular`
- `/movies/:id`
- `/search`
- `/account`
- unknown paths -> `/404`

## Included

- JWT login using the provided CCBP API
- JWT stored in `jwt_token` cookie
- username/password stored in localStorage for the Account page
- protected routes
- Trending, Originals, Top Rated and Popular APIs
- Movie details and similar movies
- Search with loading, failure and no-results states
- React Slick responsive movie sliders
- BeatLoader and ClipLoader
- date-fns release year formatting
- required alt text and `data-testid` attributes
- responsive CSS media queries
- Footer social icons
