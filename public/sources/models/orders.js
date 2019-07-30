import {urls} from "../config/urls";

export const orders = new webix.DataCollection({
	url: urls.orders,
	save: `rest->${urls.orders}`
});
