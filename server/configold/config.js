module.exports = {
  port: process.env.PORT || 8081,
  "MONGO_ATLAS_CONNECTION":"mongodb://brian123:brian123@cluster-free1-shard-00-00-7juzj.mongodb.net:27017,cluster-free1-shard-00-01-7juzj.mongodb.net:27017,cluster-free1-shard-00-02-7juzj.mongodb.net:27017/accounts?ssl=true&replicaSet=cluster-free1-shard-0&authSource=admin&retryWrites=true",
  authentication: {
    jwtSecret: process.env.JWT_SECRET || 'secret'
  }
}
