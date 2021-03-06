// const bodyParser = require('body-parser')
const express = require('express')
const config = require('./configold/config')
// const api = require('./api')

console.log("loaded api....what............ from configure.js")
console.log(`checking JWT: ${config.authentication.jwtSecret}`)

module.exports = app => {
  var mongoose = require('mongoose');

// var uri = 'mongodb://brian123:brian123@cluster-free1-shard-00-00-7juzj.mongodb.net:27017,cluster-free1-shard-00-01-7juzj.mongodb.net:27017' + 
// ',cluster-free1-shard-00-02-7juzj.mongodb.net:27017/test?ssl=true&replicaSet=cluster-free1-shard-0&authSource=admin&retryWrites=true'
console.log('connecting to mongoose: in app.js')
mongoose.connect(config.MONGO_ATLAS_CONNECTION);
// mongoose.connect(config.uri);
// authentication: {
//   jwtSecret: process.env.JWT_SECRET || 'secret'
// }
console.log(`checking JWT in app: ${config.authentication}`)
app.use(express.json())
  // app.use(bodyParser.json())
 // app.use('/api', api)
  require('./routes')(app)
}