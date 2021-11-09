const mongoose = require('mongoose')

MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/vtube'

const DBconnection = async () => {
  const conn = await mongoose
    .connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .catch(err => {
      console.log(`For some reasons we couldn't connect to the DB`.red, err)
    })

  console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline.bold)
}

module.exports = DBconnection
