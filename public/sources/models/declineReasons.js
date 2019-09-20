import {urls} from "../config/urls";

export const reasons = new webix.DataCollection({
	url: urls.declineReasons,
	save: `rest->${urls.declineReasons}`
});
