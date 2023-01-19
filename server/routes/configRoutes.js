const orderR = require("./orders.js")

exports.routesInit = (app) => {
    app.use("/orders", orderR);
}