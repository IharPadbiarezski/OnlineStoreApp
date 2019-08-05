const path = require("../config/path");
const declineReasonsController = require("../controllers/declineReasons");

module.exports = (app) => {
	app.get(`${path.declineReasons}`, declineReasonsController.all);
	app.get(`${path.declineReasons}:id`, declineReasonsController.findById);
	app.post(`${path.declineReasons}findreason`, declineReasonsController.findOne);
	app.delete(`${path.declineReasons}:id`, declineReasonsController.delete);
	app.post(`${path.declineReasons}`, declineReasonsController.create);
	app.put(`${path.declineReasons}:id`, declineReasonsController.update);
};
