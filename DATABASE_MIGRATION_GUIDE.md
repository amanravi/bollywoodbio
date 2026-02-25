# Database Migration Guide

## ✅ Database Implementation Complete!

Your website now uses **SQLite database** instead of JSON files. This solves all the Git sync problems and makes your data management much easier.

## What Changed

### ✅ Database Library
- **Switched to `sql.js`** - Pure JavaScript SQLite (works everywhere, no compilation needed)
- Database file: `data/bollywoodbio.db`
- All data is now stored in a proper database

### ✅ Updated Files
- `lib/db.ts` - Database connection and schema
- `lib/db-movies.ts` - Movie database operations
- `lib/db-contacts.ts` - Contact form database operations
- `lib/movies.ts` - Now uses database functions
- `app/api/movies/route.ts` - Updated to use database
- `app/api/contact/route.ts` - Updated to use database

## How to Migrate Your Data

### Step 1: Run the Migration Script

```bash
npm run migrate
```

This will:
- ✅ Create the database file (`data/bollywoodbio.db`)
- ✅ Migrate all movies from `data/movies.json`
- ✅ Migrate all contacts from `data/contacts.json` (if exists)
- ✅ Keep your existing data safe

### Step 2: Test the Website

```bash
npm run dev
```

Visit `http://localhost:3000` and verify:
- ✅ Movies are displayed correctly
- ✅ Admin panel works
- ✅ Contact form works

## Benefits

### ✅ No More Git Sync Problems
- **Before**: Data in JSON files → Git sync issues
- **Now**: Data in database → Separate from code

### ✅ Easy Data Management
- Add movies on live server → Data stays on server
- Deploy code updates → Data remains safe
- No need to sync data back to Git

### ✅ Better Performance
- Database queries are faster than reading JSON files
- Indexes for better search performance

### ✅ Production Ready
- Proper database structure
- Better error handling
- Concurrent access support

## Database File Location

- **Local**: `data/bollywoodbio.db`
- **Production**: `data/bollywoodbio.db` (on Hostinger server)

## Backup Strategy

### Manual Backup
```bash
# Copy the database file
cp data/bollywoodbio.db data/bollywoodbio.db.backup
```

### Automated Backup (Recommended)
Set up a cron job on Hostinger to backup the database daily:

```bash
# Add to crontab (crontab -e)
0 2 * * * cp /path/to/bollywoodbio/data/bollywoodbio.db /path/to/backups/bollywoodbio-$(date +\%Y\%m\%d).db
```

## Important Notes

### ✅ Database is NOT in Git
- The `.db` file is in `.gitignore`
- This is **intentional** - data stays on the server
- Code and data are now separate

### ✅ Migration is Safe
- Your JSON files are **not deleted**
- They remain as backup
- You can always re-run migration if needed

### ✅ Admin Panel Works the Same
- No changes to the admin interface
- Same functionality, better backend

## Troubleshooting

### Database Not Created?
```bash
# Make sure data directory exists
mkdir -p data

# Run migration again
npm run migrate
```

### Migration Fails?
- Check that `data/movies.json` exists
- Check file permissions
- Check console for error messages

### Data Not Showing?
- Make sure migration ran successfully
- Check that database file exists: `data/bollywoodbio.db`
- Restart the dev server: `npm run dev`

## Next Steps

1. ✅ Run migration: `npm run migrate`
2. ✅ Test locally: `npm run dev`
3. ✅ Deploy to Hostinger
4. ✅ Run migration on server (first time only)
5. ✅ Enjoy no more Git sync problems! 🎉

## Questions?

- **Q: Will my existing data be lost?**
  - A: No! Migration copies data from JSON to database. JSON files remain as backup.

- **Q: Do I need to change anything in the admin panel?**
  - A: No! Everything works the same way.

- **Q: What if I want to go back to JSON?**
  - A: Your JSON files are still there. You can export from database if needed.

- **Q: Does this work on Hostinger?**
  - A: Yes! `sql.js` works everywhere, no compilation needed.
