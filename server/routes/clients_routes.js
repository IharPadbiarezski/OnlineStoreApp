const path = require("../config/path");
const clientsController = require("../controllers/clients");

module.exports = (app) => {
	app.get(`${path.clients}`, clientsController.all);
	app.get(`${path.clients}:id`, clientsController.findById);
	app.delete(`${path.clients}:id`, clientsController.delete);
	app.post(`${path.clients}`, clientsController.create);
	app.put(`${path.clients}:id`, clientsController.update);
};
