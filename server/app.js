const express = require("express");
const app = express();

const configureAPI = require('../server/src/configure');

function jstr(x){
  return JSON.stringify(x, null, 3)
}
configureAPI(app)
app.use(express.static('../client/dist'))

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
