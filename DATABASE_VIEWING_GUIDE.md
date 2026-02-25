# How to View Your Database

## Database Location

Your SQLite database is stored at:
```
data/bollywoodbio.db
```

## 3 Ways to View Your Database

### Option 1: Admin Database Page (Easiest) ✅

1. Go to: `http://localhost:3000/admin/database`
2. Login with your admin password
3. View database statistics and information

**Features:**
- ✅ View total movies, active movies, featured movies
- ✅ View total contacts, unread contacts
- ✅ See database location
- ✅ Get instructions for other viewing methods

### Option 2: DB Browser for SQLite (Recommended for Full Access)

**Best for:** Viewing and editing database directly

1. **Download DB Browser for SQLite:**
   - Visit: https://sqlitebrowser.org/
   - Download and install (free, open-source)

2. **Get Database File:**
   - **Local Development:**
     - File is at: `data/bollywoodbio.db`
     - Just open it directly in DB Browser
   
   - **Production (Hostinger):**
     - Connect via FTP/SFTP
     - Download: `data/bollywoodbio.db`
     - Open in DB Browser

3. **View Database:**
   - Open DB Browser
   - Click "Open Database"
   - Select `bollywoodbio.db`
   - Browse tables, run queries, edit data

**Tables:**
- `movies` - All movie data
- `contacts` - Contact form submissions

### Option 3: Command Line (SSH)

**Best for:** Quick checks, server access

1. **Connect to Server:**
   ```bash
   ssh your-username@your-server
   ```

2. **Navigate to Project:**
   ```bash
   cd /path/to/bollywoodbio
   ```

3. **Open SQLite:**
   ```bash
   sqlite3 data/bollywoodbio.db
   ```

4. **Useful Commands:**
   ```sql
   -- View all tables
   .tables
   
   -- View movies
   SELECT * FROM movies;
   
   -- View contacts
   SELECT * FROM contacts;
   
   -- Count movies
   SELECT COUNT(*) FROM movies;
   
   -- View schema
   .schema movies
   
   -- Exit
   .quit
   ```

## Quick Access from Admin Panel

From the main admin dashboard (`/admin`), click **"View Database"** button to:
- See database statistics
- Get viewing instructions
- Access database information

## Database Structure

### Movies Table
- `id` - Unique identifier
- `title` - Movie title
- `description` - Short description
- `image` - Poster image path
- `bookingUrl` - Booking link
- `releaseDate` - Release date
- `isActive` - Active status (0 or 1)
- `isFeatured` - Featured status (0 or 1)
- `isPreviousDistribution` - Previous distribution flag (0 or 1)
- `synopsis`, `trailerLink`, `cast`, `director`, `genre`, `duration`, `rating`, `language` - Additional details

### Contacts Table
- `id` - Unique identifier
- `name` - Contact name
- `email` - Contact email
- `subject` - Message subject
- `message` - Message content
- `timestamp` - Submission time
- `read` - Read status (0 or 1)

## Tips

### ✅ Backup Before Editing
Always backup your database before making direct edits:
```bash
cp data/bollywoodbio.db data/bollywoodbio.db.backup
```

### ✅ Use Admin Panel for Regular Tasks
For adding/editing movies, use the admin panel (`/admin`) - it's safer and easier.

### ✅ Direct Database Editing
Only edit the database directly if you know what you're doing. The admin panel is recommended for most tasks.

## Troubleshooting

### Database File Not Found?
- Make sure you've run the migration: `npm run migrate`
- Check that the `data` directory exists
- Verify file permissions

### Can't Open Database?
- Make sure SQLite is installed (for command line)
- Check file permissions
- Verify the database file isn't corrupted

### Need Help?
- Use the admin panel for most operations
- Check database stats at `/admin/database`
- Use DB Browser for visual editing
