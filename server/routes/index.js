const clientsRoutes = require("./clients_routes");
const statusesRoutes = require("./statuses_routes");
const declineReasonsRoutes = require("./declineReasons_routes");
const deliveryTypesRoutes = require("./deliveryTypes_routes");
const ordersRoutes = require("./orders_routes");
const paymentTypesRoutes = require("./paymentTypes_routes");
const phoneModelsRoutes = require("./phoneModels_routes");
const phonesRoutes = require("./phones_routes");
const statusReasonsRoutes = require("./statusReasons_routes");
const sessionRoutes = require("./session_routes");

module.exports = (app) => {
	clientsRoutes(app);
	statusesRoutes(app);
	declineReasonsRoutes(app);
	deliveryTypesRoutes(app);
	ordersRoutes(app);
	paymentTypesRoutes(app);
	phoneModelsRoutes(app);
	phonesRoutes(app);
	statusReasonsRoutes(app);
	sessionRoutes(app);
};
