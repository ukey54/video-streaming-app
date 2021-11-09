const express = require('express')
const {
  getUsers,
  getUser,
  createUser,
} = require('../controllers/users')

const User = require('../models/User')

const router = express.Router({ mergeParams: true })

const advancedResults = require('../middleware/advancedResults')
const { protect, authorize } = require('../middleware/auth')

router
  .route('/')
  .get(protect, authorize('admin'), advancedResults(User), getUsers)
  .post(protect, authorize('admin'), createUser)

router
  .route('/:id')
  .get(getUser)

module.exports = router
