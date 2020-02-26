const express = require("express");
const app = express();
var cors = require('cors')
// const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const productRoutes = require("./api/routes/products");
const accountRoutes = require("./api/routes/accounts");
const orderRoutes = require("./api/routes/orders");
const userRoutes = require('./api/routes/user');

var uri =  process.env.MONGO_ATLAS_CONNECTION;
  mongoose.connect(uri, {useMongoClient: true}).then(
    () => {
      console.log("Database connection established to " + newDatabase);
    },
    err => {
      console.log("Error connecting Database instance due to: ", err);
    }
  );
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
