import {urls} from "../config/urls";

export const deliveryTypes = new webix.DataCollection({
	url: urls.deliveryTypes,
	save: `rest->${urls.deliveryTypes}`
});
