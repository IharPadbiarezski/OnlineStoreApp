const path = require("../config/path");
const phoneModelsController = require("../controllers/phoneModels");

module.exports = (app) => {
	app.get(`${path.phoneModels}`, phoneModelsController.all);
	app.get(`${path.phoneModels}:id`, phoneModelsController.findById);
	app.delete(`${path.phoneModels}:id`, phoneModelsController.delete);
	app.post(`${path.phoneModels}`, phoneModelsController.create);
	app.put(`${path.phoneModels}:id`, phoneModelsController.update);
};
