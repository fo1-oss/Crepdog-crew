# CDC Investor Portal - Backend API

World-class backend system for the CDC Investor Portal with authentication, investor analytics tracking, and automated OCR data extraction.

## 🚀 Features

- **Authentication & Authorization**: Secure JWT-based login with session management
- **Investor Analytics**: Track login times, locations, session duration, and page engagement
- **OCR Data Extraction**: Automated document processing with Google Cloud Vision API
- **Google Drive Integration**: Monitors Drive folders for document updates
- **Real-time Analytics Dashboard**: Comprehensive investor behavior insights

## 📋 Prerequisites

- Node.js 18+ and npm
- PostgreSQL database
- Google Cloud Platform account (for Vision API and Drive API)
- Google Drive folder IDs for documents

## 🛠️ Installation

### 1. Install Dependencies

```bash
cd backend
npm install
```

**Note**: You'll need to manually add `multer` to package.json dependencies:
```json
"multer": "^1.4.5-lts.1"
```

### 2. Set Up PostgreSQL Database

Create a new PostgreSQL database:

```bash
createdb cdc_investor_portal
```

### 3. Configure Environment Variables

Copy `.env.example` to `.env` and update with your values:

```bash
cp .env.example .env
```

**Required Environment Variables:**

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/cdc_investor_portal?schema=public"

# JWT
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"

# Google Cloud
GOOGLE_CLOUD_PROJECT_ID="your-project-id"
GOOGLE_APPLICATION_CREDENTIALS="./credentials/google-cloud-key.json"

# Google Drive Folder IDs
GOOGLE_DRIVE_PITCH_DECK_FOLDER_ID="16dEnuE4Aml9asy6tmn3a8AqtRUn08PTE"
GOOGLE_DRIVE_MIS_FOLDER_ID="1hJVr0xzckP_iSMZekXmkAGm_IaGmyHNU"
GOOGLE_DRIVE_FINANCIALS_FOLDER_ID="138WYK9a_5kOLRkVCSllR8fD-peJ8JvrG"
```

### 4. Set Up Google Cloud Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable **Cloud Vision API** and **Google Drive API**
4. Create a service account and download the JSON key
5. Save the key as `backend/credentials/google-cloud-key.json`

### 5. Run Database Migrations

```bash
npm run db:generate
npm run db:migrate
```

This will create all necessary database tables.

### 6. Start the Server

**Development mode (with hot reload):**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

The server will start on `http://localhost:3000`

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - Create investor account
- `POST /api/auth/login` - Login and receive JWT token
- `POST /api/auth/logout` - End session
- `GET /api/auth/me` - Get current user info

### Analytics
- `POST /api/analytics/pageview` - Track page view
- `POST /api/analytics/session/heartbeat` - Keep session alive
- `GET /api/analytics/dashboard` - Admin analytics dashboard
- `GET /api/analytics/investor/:id` - Individual investor analytics

### OCR
- `POST /api/ocr/process` - Manually trigger OCR processing
- `POST /api/ocr/upload` - Upload document for OCR
- `GET /api/ocr/status/:jobId` - Check OCR job status
- `GET /api/ocr/history` - View processing history

### Data
- `GET /api/data/all` - Get all business data (public)
- `PUT /api/data/update` - Update data manually (admin)
- `POST /api/data/sync` - Trigger Google Sheets sync

## 🔐 Authentication Flow

1. User registers via `/api/auth/register`
2. User logs in via `/api/auth/login` and receives JWT token
3. Frontend stores token in localStorage
4. All subsequent requests include `Authorization: Bearer <token>` header
5. Backend tracks session with IP geolocation and device info

## 📊 Analytics Tracking

The backend automatically tracks:
- **Login time and location** (IP-based geolocation)
- **Session duration** (from login to logout)
- **Page views** (which pages investor visited)
- **Time spent** per page
- **Scroll depth** and interactions

Access analytics via:
- Admin dashboard: `GET /api/analytics/dashboard`
- Individual investor: `GET /api/analytics/investor/:id`

## 🤖 OCR Processing

### Automated Processing (Google Drive Monitoring)

The backend polls Google Drive folders every 15 minutes for new/updated documents:

1. Detects new files in configured Drive folders
2. Downloads file locally
3. Processes with Google Cloud Vision API (for images/PDFs) or direct parsing (for Excel)
4. Extracts business metrics using custom parsers
5. Updates business data in database

### Manual Processing

Upload documents directly via API:

```bash
curl -X POST http://localhost:3000/api/ocr/upload \
  -H "Authorization: Bearer <token>" \
  -F "document=@pitch_deck.pdf" \
  -F "documentType=PITCH_DECK"
```

### Supported Document Types

- **PITCH_DECK**: Extracts ARR, revenue, margins, team size, etc.
- **MIS**: Extracts quarterly revenue, channel splits, store performance
- **FINANCIALS**: Extracts P&L, balance sheet, financial ratios

## 🗄️ Database Schema

### Key Models

- **User**: Investor accounts with email/password
- **Session**: Active sessions with location and device info
- **PageView**: Individual page views with time spent
- **DocumentVersion**: Processed documents from Drive
- **BusinessData**: Centralized business metrics
- **OcrJob**: OCR processing job tracking

## 🚀 Deployment

### Option 1: Railway

1. Create account on [Railway](https://railway.app/)
2. Create new project from GitHub repo
3. Add PostgreSQL database
4. Set environment variables
5. Deploy

### Option 2: Render

1. Create account on [Render](https://render.com/)
2. Create new Web Service
3. Connect GitHub repo
4. Add PostgreSQL database
5. Set environment variables
6. Deploy

### Environment Variables for Production

Make sure to set in production:
- `NODE_ENV=production`
- `DATABASE_URL` (from hosting provider)
- `JWT_SECRET` (generate secure random string)
- `CORS_ORIGIN` (your frontend URL, e.g., https://cdcdataroom.vercel.app)
- Google Cloud credentials

## 🧪 Testing

Run tests:
```bash
npm test
```

Run integration tests:
```bash
npm run test:integration
```

## 📝 Admin Setup

Create an admin user by registering normally, then update in database:

```sql
UPDATE users SET role = 'ADMIN' WHERE email = 'admin@crepdogcrew.com';
```

## 🔧 Troubleshooting

### Database Connection Issues

```bash
# Check if PostgreSQL is running
pg_isready

# Reset database
npm run db:migrate -- --reset
```

### Google Cloud API Issues

- Ensure Vision API and Drive API are enabled
- Check service account has proper permissions
- Verify credentials file path is correct

### OCR Not Processing

- Check Google Drive folder IDs are correct
- Verify service account has read access to Drive folders
- Check backend logs for errors

## 📚 Additional Resources

- [Prisma Documentation](https://www.prisma.io/docs)
- [Google Cloud Vision API](https://cloud.google.com/vision/docs)
- [Google Drive API](https://developers.google.com/drive)
- [JWT Best Practices](https://jwt.io/introduction)

## 🤝 Support

For issues or questions, contact the development team.

---

**Built with ❤️ for Crepdog Crew**
