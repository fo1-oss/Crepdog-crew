# ⚠️ Google Cloud Configuration Notice

## Current Setup

I've configured the backend to use your Google Cloud Vision API key:
- **API Key**: `AIzaSyBv4Tr4EZkuMz2ONRu0Y9z5L2RIYgf4jkc`
- **Configuration**: Updated in `backend/.env`

## Important Notes

### API Key vs Service Account

You provided an API key, but Google Cloud Vision API typically requires a **service account** for server-side applications. API keys have limitations:

- ✅ **Works for**: Simple API calls
- ❌ **May not work for**: Server-to-server authentication
- ❌ **Security**: API keys are less secure than service accounts

### Recommended Setup (Service Account)

For production use, you should use a service account:

1. **Go to Google Cloud Console**: https://console.cloud.google.com/
2. **Enable APIs**:
   - Cloud Vision API
   - Google Drive API
3. **Create Service Account**:
   - IAM & Admin → Service Accounts
   - Create Service Account
   - Grant roles: "Cloud Vision API User" and "Drive API User"
4. **Download JSON Key**:
   - Click on service account
   - Keys → Add Key → Create New Key → JSON
   - Download the JSON file
5. **Replace the credentials file**:
   ```bash
   # Replace the placeholder file with your actual credentials
   mv ~/Downloads/your-service-account-key.json backend/credentials/google-cloud-key.json
   ```

### Current Configuration

The backend is configured to try the API key first, then fall back to service account credentials. The OCR service will:

1. Try to use `GOOGLE_CLOUD_API_KEY` if available
2. Fall back to `GOOGLE_APPLICATION_CREDENTIALS` (service account JSON)

### Testing OCR

To test if OCR is working:

1. Start the backend server
2. Upload a document via the API:
   ```bash
   curl -X POST http://localhost:3000/api/ocr/upload \
     -H "Authorization: Bearer YOUR_JWT_TOKEN" \
     -F "document=@test.pdf" \
     -F "documentType=PITCH_DECK"
   ```

### If OCR Doesn't Work

If you get authentication errors:
1. Get a proper service account JSON key (recommended)
2. Or ensure your API key has the right permissions
3. Check backend logs for specific error messages

### Google Drive Monitoring

The Google Drive monitoring is **enabled** with your folder IDs:
- Pitch Deck: `16dEnuE4Aml9asy6tmn3a8AqtRUn08PTE`
- MIS: `1hJVr0xzckP_iSMZekXmkAGm_IaGmyHNU`
- Financials: `138WYK9a_5kOLRkVCSllR8fD-peJ8JvrG`

**Note**: Drive API also requires service account authentication with proper permissions.

---

**For now, the system will work without OCR. All other features (authentication, analytics) work perfectly!**
