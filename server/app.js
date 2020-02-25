const express = require("express");
const app = express();
var cors = require('cors')
// const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
// const MongoClient = require("mongodb").MongoClient;

const productRoutes = require("./api/routes/products");
const accountRoutes = require("./api/routes/accounts");
const orderRoutes = require("./api/routes/orders");
const userRoutes = require('./api/routes/user');

// from cloud.mongodb.com  goto Overview then connect then connect with application
// mongodb+srv://brian123:<password>@cluster-free1-7juzj.mongodb.net/test?retryWrites=true
// var newDatabase = "acct"
var newDatabase = "accounts"
//var uri = `mongodb+srv://brian123:brian123@cluster-free1-7juzj.mongodb.net/${newDatabase}?retryWrites=true`
// var uri = "mongodb+srv://brian123:brian123@cluster-free1-7juzj.mongodb.net/test?retryWrites=true"


var uri = `mongodb://brian123:brian123@cluster-free1-shard-00-00-7juzj.mongodb.net:27017,cluster-free1-shard-00-01-7juzj.mongodb.net:27017' + 
',cluster-free1-shard-00-02-7juzj.mongodb.net:27017/${newDatabase}?ssl=true&replicaSet=cluster-free1-shard-0&authSource=admin&retryWrites=true`
// var uri = 'mongodb://brian123:brian123@cluster-free1-shard-00-00-7juzj.mongodb.net:27017,cluster-free1-shard-00-01-7juzj.mongodb.net:27017' + 
// ',cluster-free1-shard-00-02-7juzj.mongodb.net:27017/test?ssl=true&replicaSet=cluster-free1-shard-0&authSource=admin&retryWrites=true'


// var uri = 'mongodb://iambrian:bkcbkc07!@' +
//   'MY_SERVER-shard-00-00-clv3h.mongodb.net:27017,' +
//   'MY_SERVER-shard-00-01-clv3h.mongodb.net:27017,' +
//   'MY_SERVER-shard-00-02-clv3h.mongodb.net:27017/MY_DATABASE' +
//   'ssl=true&replicaSet=MY_REPLICASET_NAME-shard-0&authSource=MY_ADMIN_DATABASE';

// mongoose.connect(uri,{
//     useMongoClient: true,
//     // useNewUrlParser: true
//   });
  mongoose.connect(uri, {useMongoClient: true}).then(
    () => {
      console.log("Database connection established to " + newDatabase);
    },
    err => {
      console.log("Error connecting Database instance due to: ", err);
    }
  );
//   MongoClient.connect(CONNECTION_URL, { useNewUrlParser: true }, (error, client) => {
//     if(error) {
//         throw error;
//     }
//     database = client.db(DATABASE_NAME);
//     collection = database.collection("people");
//     console.log("Connected to `" + DATABASE_NAME + "`!");
// });


  // var kittySchema = new mongoose.Schema({
  //   name: String
  // });
  
  // var Kitten = mongoose.model('Kitten', kittySchema);
  // var kitten = new Kitten({ name: 'Brians atlax mongo' });
  // console.log(kitten.name); // 'Silence'

  // kitten.save(function (err, fluffy) {
  //   if (err) return console.error(err);
  //   console.log(`we saved a kitten...${fluffy}`)
  // });

// commenting out example code  
// mongoose.connect(
//   "mongodb://node-shop:" +
//     process.env.MONGO_ATLAS_PW +
//     "@node-rest-shop-shard-00-00-wovcj.mongodb.net:27017,node-rest-shop-shard-00-01-wovcj.mongodb.net:27017,node-rest-shop-shard-00-02-wovcj.mongodb.net:27017/test?ssl=true&replicaSet=node-rest-shop-shard-0&authSource=admin",
//   {
//     useMongoClient: true
//   }
// );
mongoose.Promise = global.Promise;

app.use(cors())

app.use(bodyParser.json());
function jstr(x){
  return JSON.stringify(x, null, 3)
}

app.use(express.static('../client'))


// Routes which should handle requests
app.use("/products", productRoutes);
app.use("/accounts", accountRoutes);

app.use("/orders", orderRoutes);
app.use("/user", userRoutes);

app.use((req, res, next) => {
  console.log(`req info: baseUrl=  ${req.baseUrl} originalUrl: ${req.originalUrl}`)
  console.log(`req query: ${jstr(req.query)} req.params: ${jstr(req.params)}req.body: ${jstr(req.body)}`)
  next()
})

app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

module.exports = app;
