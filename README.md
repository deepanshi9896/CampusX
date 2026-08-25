# CampusX — Student Clubs Directory

A React (Vite + React Router) project for browsing campus clubs and events.

## Run it in VS Code

1. Unzip this folder and open it in VS Code.
2. Open a terminal in the project folder and run:

   ```bash
   npm install
   npm run dev
   ```

3. Open the URL shown in the terminal (usually http://localhost:5173).

## Project structure

```
src/
  main.jsx              -> app entry, sets up BrowserRouter
  App.jsx                -> routes: "/" (Home) and "/events" (Events)
  index.css              -> all styling (design tokens at the top)
  data/
    clubs.js              -> edit this to add/change clubs
    events.js              -> edit this to add/change events
  components/
    Navbar.jsx            -> Home / Upcoming Events / Explore
    Hero.jsx               -> single banner image
    SearchClubs.jsx        -> search box + hobby pills
    ClubCard.jsx            -> one club card in the grid
    ClubModal.jsx           -> popup shown on the same page when a club is clicked
    Footer.jsx               -> site footer
  pages/
    Home.jsx               -> hero + search + explore clubs grid + popup
    Events.jsx              -> upcoming events list
```

## Notes

- Clicking a club card opens a **popup on the same page** with its
  description (it does not navigate to a new page).
- The navbar's "Explore" link scrolls down to the clubs section on the
  home page (using React Router, not a plain anchor tag).
- Searching "dance" (or any tag) filters the club grid live.
- Club/event photos are placeholder Unsplash images — swap the `image`
  URLs in `src/data/clubs.js` / `src/data/events.js` with your own.
