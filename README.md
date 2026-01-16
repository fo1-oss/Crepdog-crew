# CDC Investor Data Room v2.0

A modern, secure investor data room for Crepdog Crew with Firebase authentication, Google Drive integration, AI chatbot, and admin analytics.

![CDC Data Room](https://img.shields.io/badge/version-2.0-lime)
![React](https://img.shields.io/badge/React-18.2-blue)
![Firebase](https://img.shields.io/badge/Firebase-Auth%20%2B%20Firestore-orange)

## Features

### 🔐 Authentication
- Email/Password login
- Google OAuth integration
- Role-based access (Admin/Investor)
- Session tracking with geolocation

### 📊 Dashboard
- **Overview**: Key metrics, problem cards, recent documents
- **Financials**: P&L highlights, key ratios, balance sheet
- **Stores**: Store-wise performance, expansion roadmap
- **Documents**: Google Drive integration with folder categorization

### 🤖 AI Assistant
- Built-in chatbot powered by CDC knowledge base
- Quick questions for common investor queries
- Comprehensive data on financials, operations, growth

### 👨‍💼 Admin Features
- **Investor Tracking**: Sessions, locations, activity logs
- **OCR Reader**: Upload and process documents
- **Data Cards Editor**: CRUD operations for data cards
- **Analytics**: Comprehensive dashboard metrics

## Tech Stack

- **Frontend**: React 18, Vite, Tailwind CSS
- **Backend**: Firebase (Auth, Firestore)
- **APIs**: Google Drive API
- **Styling**: Neo-brutalist design with Inter font

## Project Structure

```
cdc-dataroom/
├── src/
│   ├── App.jsx          # Main application component
│   ├── firebase.js      # Firebase configuration
│   ├── index.css        # Styles (matches original HTML design)
│   └── main.jsx         # Entry point
├── index.html           # HTML template
├── package.json         # Dependencies
├── vite.config.js       # Vite configuration
├── tailwind.config.js   # Tailwind configuration
└── postcss.config.js    # PostCSS configuration
```

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-repo/cdc-dataroom.git
   cd cdc-dataroom
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

## Configuration

### Firebase Setup
The Firebase configuration is in `src/firebase.js`. Update the config object with your Firebase project credentials:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.firebasestorage.app",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

### Admin Emails
Update the `ADMIN_EMAILS` array in `firebase.js` to grant admin access:

```javascript
export const ADMIN_EMAILS = [
  'admin@crepdogcrew.com',
  'anchit@crepdogcrew.com',
  // Add more admin emails
];
```

### Google Drive Folders
Configure the Drive folder IDs in `firebase.js`:

```javascript
export const DRIVE_FOLDERS = {
  PITCH_DECK: "YOUR_FOLDER_ID",
  MIS: "YOUR_FOLDER_ID",
  AUDITED_FINANCIALS: "YOUR_FOLDER_ID"
};
```

## Deployment

### Vercel (Recommended)
1. Push to GitHub
2. Import project in Vercel
3. Deploy automatically

### Manual
1. Build the project: `npm run build`
2. Deploy the `dist/` folder to your hosting provider

## Design System

### Colors
- `--cream: #F5F3EB` - Background
- `--lime: #C0E529` - Primary accent
- `--olive-dark: #4A5D23` - Secondary
- `--black: #000000` - Text/borders

### Components
- **CDC Card**: Primary container with 3px border, 20px radius
- **Metric Row**: Pill-style data display
- **Stat Pill**: KPI badges
- **Store Card**: Store performance cards with variants

## API Reference

### Firebase Functions
- `loginWithEmail(email, password)` - Email authentication
- `loginWithGoogle()` - Google OAuth
- `saveSession(userId, data)` - Track user sessions
- `saveActivity(userId, data)` - Log user activity
- `getDataCards()` - Fetch data cards
- `saveDataCard(data)` - Create data card
- `updateDataCard(id, data)` - Update data card
- `deleteDataCard(id)` - Delete data card

## License

MIT License - Crepdog Crew © 2024-2026

## Support

For support, contact: tech@crepdogcrew.com
