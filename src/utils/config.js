const dotenv = require('dotenv');

// Load environment variables based on NODE_ENV
if (process.env.NODE_ENV === 'development') {
  dotenv.config({ path: '.env.development' })
} else {
  dotenv.config()
}

module.exports = {
  apiKey: process.env.API_KEY,
  telegramGroupId: process.env.TELEGRAM_GROUP_ID,
  telegramBotKey: process.env.TELEGRAM_BOT_KEY,
  firebase: {
    type: process.env.FIREBASE_TYPE,
    project_id: process.env.FIREBASE_PROJECT_ID,
    private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
    private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    client_email: process.env.FIREBASE_CLIENT_EMAIL,
    client_id: process.env.FIREBASE_CLIENT_ID,
    auth_uri: process.env.FIREBASE_AUTH_URI,
    token_uri: process.env.FIREBASE_TOKEN_URI,
    auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_CERT,
    client_x509_cert_url: process.env.FIREBASE_CLIENT_CERT,
    universe_domain: process.env.FIREBASE_UNIVERSE_DOMAIN,
  },
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  databaseUserRoute: process.env.DATABASE_USER_ROUTE
}
