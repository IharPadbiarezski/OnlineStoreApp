const path = require("../config/path");
const statusReasonsController = require("../controllers/statusReasons");

module.exports = (app) => {
	app.get(`${path.statusReasons}`, statusReasonsController.all);
	app.get(`${path.statusReasons}:id`, statusReasonsController.findById);
	app.delete(`${path.statusReasons}:id`, statusReasonsController.delete);
	app.post(`${path.statusReasons}`, statusReasonsController.create);
	app.put(`${path.statusReasons}:id`, statusReasonsController.update);
};
