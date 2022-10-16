const mongoose = require('mongoose')

const connectDatabase = () => {
  mongoose.connect(process.env.DB_URI, {
  }).then(con => {
    console.log('Database connected')
  })
}

module.exports = connectDatabase
