const path = require("../config/path");
const ordersController = require("../controllers/orders");

module.exports = (app) => {
	app.get(`${path.orders}`, ordersController.all);
	app.get(`${path.orders}:id`, ordersController.findById);
	app.delete(`${path.orders}:id`, ordersController.delete);
	app.post(`${path.orders}`, ordersController.create);
	app.put(`${path.orders}:id`, ordersController.update);
};
