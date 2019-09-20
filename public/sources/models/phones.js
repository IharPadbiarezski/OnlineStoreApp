import {urls} from "../config/urls";

export const phones = new webix.DataCollection({
	url: urls.phones,
	save: `rest->${urls.phones}`
});
