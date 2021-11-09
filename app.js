const express = require('express')
const path = require('path')
const dotenv = require('dotenv')
const colors = require('colors')
const morgan = require('morgan')
const fileupload = require('express-fileupload')
const cors = require('cors')

const errorHandler = require('./middleware/error')

const DBConnection = require('./config/db')

dotenv.config({ path: './config/.env' })

DBConnection()

const authRoutes = require('./routes/auth')
const userRoutes = require('./routes/users')
const videoRoutes = require('./routes/videos')
const commentRoutes = require('./routes/comments')
const feelingRoutes = require('./routes/feelings')
const subscriptionRoutes = require('./routes/subscriptions')
const historiesRoutes = require('./routes/histories')

const app = express()

app.use(express.json())


if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

// File uploading
app.use(
  fileupload({
    createParentPath: true
  })
)

// Enable CORS
app.use(cors())

app.use(express.static(path.join(__dirname, 'public')))

app.use('/auth', authRoutes)
app.use('/users', userRoutes)
app.use('/videos', videoRoutes)
app.use('/comments', commentRoutes)
app.use('/feelings', feelingRoutes)
app.use('/subscriptions', subscriptionRoutes)
app.use('/histories', historiesRoutes)

app.use(errorHandler)

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, error  => {
  if(error){
    console.error(error.message)
    return
  }
  
  console.log(
    `We are live on ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
})