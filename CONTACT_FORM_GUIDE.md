# Contact Form Guide

## How It Works

When users submit the contact form on `/contact`, the data is:

1. **Sent to the API** (`/api/contact`)
2. **Saved to a JSON file** (`data/contacts.json`)
3. **Stored with metadata**:
   - Unique ID
   - Timestamp
   - Read/unread status

## Viewing Contact Submissions

### Option 1: Admin Panel (Recommended)
1. Go to `/admin` and login
2. Click **"View Contact Submissions"** button
3. You'll see all submissions with:
   - Name and email
   - Subject and message
   - Timestamp
   - Unread count badge
   - "Reply via Email" button (opens your email client)

### Option 2: Direct File Access
- Open `data/contacts.json` file
- All submissions are stored there in JSON format

## File Location
All contact submissions are saved in:
```
data/contacts.json
```

## Example Submission Format
```json
[
  {
    "id": "contact_1234567890",
    "name": "John Doe",
    "email": "john@example.com",
    "subject": "general",
    "message": "I have a question about...",
    "timestamp": "2024-01-15T10:30:00.000Z",
    "read": false
  }
]
```

## Future Enhancements

For production, you might want to:
1. **Email notifications**: Set up email service (SendGrid, Mailgun, etc.) to receive instant notifications
2. **Database storage**: Move from JSON file to a database (PostgreSQL, MongoDB, etc.)
3. **Auto-reply**: Send automatic confirmation emails to users
4. **Spam protection**: Add CAPTCHA or rate limiting

## Current Setup
- ✅ Form validation
- ✅ Data storage (JSON file)
- ✅ Admin viewing interface
- ✅ Reply via email button
- ⚠️ No email notifications (check admin panel manually)
