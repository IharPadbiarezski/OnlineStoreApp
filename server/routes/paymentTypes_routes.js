const path = require("../config/path");
const paymentTypesController = require("../controllers/paymentTypes");

module.exports = (app) => {
	app.get(`${path.paymentTypes}`, paymentTypesController.all);
	app.get(`${path.paymentTypes}:id`, paymentTypesController.findById);
	app.delete(`${path.paymentTypes}:id`, paymentTypesController.delete);
	app.post(`${path.paymentTypes}`, paymentTypesController.create);
	app.put(`${path.paymentTypes}:id`, paymentTypesController.update);
};
