# BollywoodBio - Movie Ticket Booking Website

A modern, easy-to-maintain website for BollywoodBio film distribution company. This website allows visitors to browse movies and book tickets through external booking links.

## Features

- **Featured Movie Banner**: Large, eye-catching banner showcasing the current hot movie with YouTube trailer support
- **Movie Details Modal**: Click "Learn More" to see full synopsis, cast, trailer, and more
- **Movie Grid**: Display all active movies in a beautiful grid layout (only shows if there are active movies)
- **Admin Dashboard**: Full admin panel for managing movies without editing code
- **Easy Maintenance**: Simple JSON file or admin panel for managing movies
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Modern UI**: Clean design inspired by filmstaden.se

## Getting Started

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

```bash
npm run build
npm start
```

## Managing Movies

### Adding a New Movie

1. Open `data/movies.json`
2. Add a new movie object to the `movies` array:

```json
{
  "id": "unique-movie-id",
  "title": "Movie Title",
  "description": "Short description (shown on cards)",
  "image": "/images/movie-poster.jpg",
  "bookingUrl": "https://your-booking-site.com/book/movie",
  "releaseDate": "2024-03-15",
  "isActive": true,
  "synopsis": "Full detailed synopsis shown in the modal",
  "trailerLink": "https://www.youtube.com/watch?v=...",
  "cast": ["Actor 1", "Actor 2", "Actor 3"],
  "director": "Director Name",
  "genre": ["Action", "Drama"],
  "duration": "2h 30m",
  "rating": "PG-13",
  "language": "Hindi"
}
```

**Required Fields:**
- `id`, `title`, `description`, `image`, `bookingUrl`, `releaseDate`, `isActive`

**Optional Fields (for detailed movie info):**
- `synopsis` - Full movie synopsis (if not provided, uses `description`)
- `trailerLink` - YouTube trailer URL
- `cast` - Array of cast member names
- `director` - Director name
- `genre` - Array of genres
- `duration` - Movie runtime (e.g., "2h 30m")
- `rating` - Movie rating (e.g., "PG-13", "A")
- `language` - Language(s) of the movie

3. Place the movie poster image in the `public/images/` folder
4. Update the `featured` object if this should be the featured movie

### Updating the Featured Movie

1. Open `data/movies.json`
2. Update the `featured` object with the movie details you want to feature
3. Make sure the featured movie also exists in the `movies` array

### Removing Expired Movies

Simply set `"isActive": false` for any movie you want to hide. The website will automatically filter out inactive movies. **Note:** If all movies are inactive, the "Now Showing" section will be hidden completely.

**Example:**
```json
{
  "id": "old-movie",
  "title": "Old Movie",
  "isActive": false  // This movie will not appear on the website
}
```

### Single Movie Releases

Since you typically release one movie at a time:
- Set `isActive: false` for all movies in the `movies` array
- Keep only the `featured` movie active
- The "Now Showing" section will automatically hide when there are no active movies
- Visitors can click "Learn More" on the featured banner to see full movie details

### Updating Booking Links

1. Open `data/movies.json`
2. Find the movie you want to update
3. Change the `bookingUrl` field to the new booking link

## Project Structure

```
bollywoodbio/
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Homepage
│   └── globals.css         # Global styles
├── components/
│   ├── Header.tsx          # Website header
│   ├── FeaturedBanner.tsx  # Featured movie banner
│   ├── MovieGrid.tsx       # Movie grid container
│   └── MovieCard.tsx       # Individual movie card
├── data/
│   └── movies.json         # Movie data (EDIT THIS FILE)
├── lib/
│   └── movies.ts           # Movie data utilities
└── public/
    └── images/             # Movie posters and images
```

## Quick Maintenance Guide

### Daily Tasks:
- Check `data/movies.json` for expired movies and set `isActive: false`
- Update featured movie if needed

### Weekly Tasks:
- Add new movies to the `movies` array
- Upload new movie poster images to `public/images/`
- Update booking URLs if they change

### Tips:
- Always keep unique `id` values for each movie
- Use descriptive image filenames (e.g., `dunki-poster.jpg`)
- Keep movie descriptions concise (2-3 sentences)
- Use ISO date format (YYYY-MM-DD) for release dates

## Customization

### Changing Colors

Edit `app/globals.css` and modify the CSS variables:
- `--primary-color`: Main brand color (default: red)
- `--secondary-color`: Secondary color
- `--bg-dark`: Background color

### Changing Fonts

Update the `font-family` in `app/globals.css` to use your preferred fonts.

## Deployment

This website can be deployed to:
- **Vercel** (recommended for Next.js): Connect your GitHub repo
- **Netlify**: Connect your GitHub repo
- **Any Node.js hosting**: Run `npm run build` and `npm start`

## Admin Panel

Access the admin panel at `/admin` to manage movies without editing code.

### Admin Features:
- **Add/Edit/Delete Movies**: Full CRUD operations
- **Upload Posters**: Drag and drop image uploads
- **Set Featured Movie**: Checkbox to mark the main banner movie
- **Toggle Active Status**: Show/hide movies on the website
- **Update All Fields**: Edit synopsis, cast, trailer links, booking URLs, etc.

### Default Admin Password:
The default password is `admin123`. Change it by setting the `ADMIN_PASSWORD` environment variable.

**To set a custom password:**
1. Create a `.env.local` file in the root directory
2. Add: `ADMIN_PASSWORD=your_secure_password`
3. Restart the development server

## Support

For questions or issues, please refer to the Next.js documentation: https://nextjs.org/docs
