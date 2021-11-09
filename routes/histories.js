const express = require('express')
const {
  getHistories,
  createHistory,
} = require('../controllers/histories')

const History = require('../models/History')

const router = express.Router()

const advancedResults = require('../middleware/advancedResults')
const { protect } = require('../middleware/auth')

router.use(protect)

router
  .route('/')
  .get(
    advancedResults(History, [{ path: 'videoId' }, { path: 'userId' }], {
      status: 'private'
    }),
    getHistories
  )
  .post(createHistory)

module.exports = router
