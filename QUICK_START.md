# Quick Start Guide

## First Time Setup

1. **Install Node.js** (if not already installed)
   - Download from https://nodejs.org/ (version 18 or higher)

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Add Movie Images**
   - Place movie poster images in `public/images/` folder
   - Update image paths in `data/movies.json` to match your image filenames

4. **Start Development Server**
   ```bash
   npm run dev
   ```

5. **Open Browser**
   - Navigate to http://localhost:3000

## Daily Maintenance

### To Add a New Movie:

1. Add movie poster image to `public/images/` (e.g., `new-movie.jpg`)

2. Open `data/movies.json`

3. Add to the `movies` array:
   ```json
   {
     "id": "new-movie-id",
     "title": "New Movie Name",
     "description": "Short description (shown on cards)",
     "image": "/images/new-movie.jpg",
     "bookingUrl": "https://your-booking-site.com/book/new-movie",
     "releaseDate": "2024-04-01",
     "isActive": true,
     "synopsis": "Full detailed synopsis (optional)",
     "trailerLink": "https://www.youtube.com/watch?v=...",
     "cast": ["Actor 1", "Actor 2"],
     "director": "Director Name",
     "genre": ["Action", "Drama"],
     "duration": "2h 30m",
     "rating": "PG-13",
     "language": "Hindi"
   }
   ```
   
   **Note:** Only `id`, `title`, `description`, `image`, `bookingUrl`, `releaseDate`, and `isActive` are required. Other fields are optional but enhance the movie details modal.

4. If you want this to be the featured movie, also update the `featured` object

### To Remove an Expired Movie:

1. Open `data/movies.json`
2. Find the movie
3. Change `"isActive": true` to `"isActive": false`
4. **Note:** If all movies are inactive, the "Now Showing" section will be hidden automatically

### To Update Booking Link:

1. Open `data/movies.json`
2. Find the movie
3. Update the `bookingUrl` field

## Example: Complete Workflow

**Adding "Pathaan" movie:**

1. Save poster as `public/images/pathaan.jpg`

2. Edit `data/movies.json`:
   ```json
   {
     "featured": {
       "id": "pathaan",
       "title": "Pathaan",
       "description": "An action-packed thriller.",
       "image": "/images/pathaan.jpg",
       "bookingUrl": "https://bookmyshow.com/pathaan",
       "releaseDate": "2024-03-20",
       "isActive": true
     },
     "movies": [
       // ... existing movies ...
       {
         "id": "pathaan",
         "title": "Pathaan",
         "description": "An action-packed thriller.",
         "image": "/images/pathaan.jpg",
         "bookingUrl": "https://bookmyshow.com/pathaan",
         "releaseDate": "2024-03-20",
         "isActive": true
       }
     ]
   }
   ```

3. Save the file - changes appear automatically in development mode!

## Tips

- Keep image files under 1MB for faster loading
- Use descriptive filenames (e.g., `dunki-poster.jpg` not `img1.jpg`)
- Always use unique `id` values
- Featured movie should also be in the `movies` array
- Use ISO date format: YYYY-MM-DD
- For single movie releases: Set all movies in `movies` array to `isActive: false`, keep only `featured` active
- Click "Learn More" on any movie to see full details including synopsis, cast, trailer link, etc.