const mongoose = require('mongoose')

mongoose.connect(process.env.CONNECT_URL)
.then(() => console.log('connect mongo 🔥'))
.catch((err) => console.log(`error ${err}`))

module.exports = mongoose