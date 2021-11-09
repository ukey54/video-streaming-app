const express = require('express')
const {
  getCommentByVideoId,
  createComment,
  deleteComment
} = require('../controllers/comments')

const router = express.Router()

const { protect } = require('../middleware/auth')

router
  .route('/')
  .post(protect, createComment)

router.route('/:id').delete(protect, deleteComment)

router.route('/:videoId/videos').get(getCommentByVideoId)

module.exports = router
