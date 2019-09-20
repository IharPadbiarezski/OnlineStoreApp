import {urls} from "../config/urls";

export const paymentTypes = new webix.DataCollection({
	url: urls.paymentTypes,
	save: `rest->${urls.paymentTypes}`
});
