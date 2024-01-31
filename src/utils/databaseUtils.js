const { databaseUserRoute } = require('./config')
const initializeFirebase = require('./firebase')

// Initialize Firebase
const db = initializeFirebase()

const saveUserData = (user) => {
  const userRef = db.ref(databaseUserRoute + user.id)

  userRef
    .set(user)
    .then(() => {
      console.log(`Saved user data: ${user.id} - ${user.first_name} ${user.last_name}`)
    })
    .catch((error) => {
      console.error('Error saving user data: ', error)
    })
}

const fetchUserData = async (userId) => {
  try {
    const userRef = db.ref(databaseUserRoute + userId)
    const snapshot = await userRef.once('value')
    return snapshot.val()
  } catch (error) {
    console.error('Error fetching user data: ', error)
    return null
  }
}

const fetchData = async (query) => {
  try {
    const ref = db.ref(query)
    const snapshot = await ref.once('value')
    return snapshot.val()
  } catch (error) {
    console.error('Error fetching user data: ', error)
    return null
  }
}

// Database resets structure if empty
function setDefaultUser(user, currentRound) {
  user.achievements ??= {}
  user.achievements[currentRound] ??= []

  return user
}

const createNewUser = function (from) {
  const newUser = {
    id: from?.id || 0,
    first_name: from?.first_name || 'Geen',
    last_name: from?.last_name || 'Geen',
  }

  saveUserData(newUser)
}

const fetchUserRoundCoins = async function (user) {
  const currentRound = await fetchData('round')
  const ageRanges = await fetchData('age_ranges')
  const userAgeRange = ageRanges[user.age_range]

  user = setDefaultUser(user, currentRound)

  let coins = 0

  const processAchievements = (round) => {
    Object.values(user.achievements[round]).forEach((achievement) => {
      const achievementDetails = userAgeRange.achievements[achievement]
      coins = coins + achievementDetails.coins
    })
  }

  processAchievements(currentRound)

  if (currentRound % 2 === 0 && currentRound !== 1) {
    processAchievements(currentRound - 1)
  }

  return coins
}

module.exports = {
  createNewUser,
  saveUserData,
  setDefaultUser,
  fetchData,
  fetchUserData,
  fetchUserRoundCoins,
}
