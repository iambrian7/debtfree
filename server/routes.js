
const productRoutes = require("./api/routes/products");
const accountRoutes = require("./api/routes/accounts");
const orderRoutes = require("./api/routes/orders");
const userRoutes = require('./api/routes/user');

module.exports = (app) => {
  app.use("/products", productRoutes);
  app.use("/accounts", accountRoutes);
  app.use("/orders", orderRoutes);
  app.use("/user", userRoutes);
}