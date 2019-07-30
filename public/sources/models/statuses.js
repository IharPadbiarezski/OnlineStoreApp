import {urls} from "../config/urls";

export const statuses = new webix.DataCollection({
	url: urls.statuses,
	save: `rest->${urls.statuses}`
});
