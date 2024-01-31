const { firebase, databaseURL } = require('./config')
const admin = require('firebase-admin')

function initializeFirebase() {
  admin.initializeApp({
    credential: admin.credential.cert(firebase),
    databaseURL,
  })

  const db = admin.database()
  return db
}

module.exports = initializeFirebase
