const path = require("../config/path");
const phonesController = require("../controllers/phones");

module.exports = (app) => {
	app.get(`${path.phones}`, phonesController.all);
	app.get(`${path.phones}:id`, phonesController.findById);
	app.delete(`${path.phones}:id`, phonesController.delete);
	app.post(`${path.phones}`, phonesController.create);
	app.put(`${path.phones}:id`, phonesController.update);
};
