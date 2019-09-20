const path = require("../config/path");
const deliveryTypesController = require("../controllers/deliveryTypes");

module.exports = (app) => {
	app.get(`${path.deliveryTypes}`, deliveryTypesController.all);
	app.get(`${path.deliveryTypes}:id`, deliveryTypesController.findById);
	app.delete(`${path.deliveryTypes}:id`, deliveryTypesController.delete);
	app.post(`${path.deliveryTypes}`, deliveryTypesController.create);
	app.put(`${path.deliveryTypes}:id`, deliveryTypesController.update);
};
