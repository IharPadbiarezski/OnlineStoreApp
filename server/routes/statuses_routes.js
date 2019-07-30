const path = require("../config/path");
const statusesController = require("../controllers/statuses");

module.exports = (app) => {
	app.get(`${path.statuses}`, statusesController.all);
	app.get(`${path.statuses}:id`, statusesController.findById);
	app.delete(`${path.statuses}:id`, statusesController.delete);
	app.post(`${path.statuses}`, statusesController.create);
	app.put(`${path.statuses}:id`, statusesController.update);
};
