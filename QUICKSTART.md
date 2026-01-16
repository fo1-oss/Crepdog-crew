# 🚀 Quick Start Guide - CDC Investor Portal Backend

## ✅ What's Already Done

- ✅ Backend dependencies installed (591 packages)
- ✅ Frontend dependencies installed (axios, react-router-dom)
- ✅ Environment files created (.env)
- ✅ Prisma client generated

## 📋 Next Steps to Get Running

### 1. Set Up PostgreSQL Database

You need a PostgreSQL database. Choose one option:

**Option A: Local PostgreSQL**
```bash
# Install PostgreSQL (if not installed)
brew install postgresql@14
brew services start postgresql@14

# Create database
createdb cdc_investor_portal
```

**Option B: Use Docker**
```bash
docker run --name cdc-postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=cdc_investor_portal -p 5432:5432 -d postgres:14
```

**Option C: Cloud Database (Recommended for production)**
- Use [Neon](https://neon.tech) (free tier available)
- Use [Supabase](https://supabase.com) (free tier available)
- Use [Railway](https://railway.app) PostgreSQL addon

### 2. Update Database Connection

Edit `backend/.env` and update the `DATABASE_URL`:

```env
# For local PostgreSQL:
DATABASE_URL="postgresql://localhost:5432/cdc_investor_portal?schema=public"

# For Docker:
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/cdc_investor_portal?schema=public"

# For cloud database (example):
DATABASE_URL="postgresql://user:password@host:5432/database?schema=public"
```

### 3. Run Database Migrations

```bash
cd backend
npm run db:migrate
```

This will create all the database tables (users, sessions, pageviews, etc.)

### 4. Start the Backend Server

```bash
cd backend
npm run dev
```

You should see:
```
✅ Database connected successfully
🚀 CDC Investor Portal Backend API
Server running on: http://localhost:3000
```

### 5. Start the Frontend

In a new terminal:

```bash
cd /Users/kunaalxg_/Desktop/untitled\ folder/CDC
npm run dev
```

Frontend will run on: http://localhost:5173

### 6. Test the System

1. **Open** http://localhost:5173
2. **You'll be redirected** to the login page
3. **Click "Register"** to create an account
4. **Fill in** your details and register
5. **Login** with your credentials
6. **You're in!** The investor portal should load

## 🔧 Optional: Google Cloud Setup (for OCR)

If you want the automated OCR features:

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project
3. Enable **Cloud Vision API** and **Google Drive API**
4. Create a service account
5. Download the JSON key
6. Save it as `backend/credentials/google-cloud-key.json`
7. Update `backend/.env`:
   ```env
   GOOGLE_CLOUD_PROJECT_ID="your-project-id"
   GOOGLE_APPLICATION_CREDENTIALS="./credentials/google-cloud-key.json"
   GOOGLE_DRIVE_PITCH_DECK_FOLDER_ID="your-folder-id"
   GOOGLE_DRIVE_MIS_FOLDER_ID="your-folder-id"
   GOOGLE_DRIVE_FINANCIALS_FOLDER_ID="your-folder-id"
   ```

## 🧪 Testing the Backend

### Test Authentication
```bash
# Register a user
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123",
    "name": "Test User",
    "company": "Test Company"
  }'

# Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

### Test Analytics
```bash
# Get analytics dashboard (requires admin role)
curl http://localhost:3000/api/analytics/dashboard \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## 📊 Database Management

### View Database
```bash
cd backend
npm run db:studio
```

This opens Prisma Studio at http://localhost:5555 where you can:
- View all tables
- Browse data
- Make a user an admin (change role to 'ADMIN')

### Reset Database
```bash
cd backend
npm run db:migrate -- --reset
```

## 🐛 Troubleshooting

### "Database connection failed"
- Check PostgreSQL is running: `pg_isready`
- Verify DATABASE_URL in backend/.env
- Try connecting with psql: `psql postgresql://localhost:5432/cdc_investor_portal`

### "CORS error" in browser
- Make sure backend is running on port 3000
- Check CORS_ORIGIN in backend/.env matches frontend URL

### "Module not found" errors
- Run `npm install` in both root and backend directories
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`

### Port already in use
- Backend: Change PORT in backend/.env
- Frontend: Vite will automatically use next available port

## 📁 Project Structure

```
CDC/
├── backend/              # Backend API
│   ├── src/
│   │   ├── controllers/  # Request handlers
│   │   ├── services/     # Business logic
│   │   ├── routes/       # API routes
│   │   ├── middleware/   # Auth, validation
│   │   └── server.js     # Main server
│   ├── prisma/
│   │   └── schema.prisma # Database schema
│   └── .env              # Backend config
├── src/                  # Frontend React app
│   ├── pages/            # Login, Register, etc.
│   ├── services/         # API client
│   └── hooks/            # useAuth hook
└── .env                  # Frontend config
```

## 🎯 What You Can Do Now

1. **Authentication**: Users can register and login
2. **Analytics Tracking**: See who logged in, when, from where
3. **Session Management**: Track time spent on each page
4. **Admin Dashboard**: View all investor analytics
5. **OCR Processing**: Upload documents to extract data (if Google Cloud configured)

## 🚀 Deployment

See [backend/README.md](file:///Users/kunaalxg_/Desktop/untitled%20folder/CDC/backend/README.md) for deployment instructions to Railway/Render.

---

**Everything is set up and ready to go! 🎉**

Just run the database migration and start the servers!
