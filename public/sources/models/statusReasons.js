import {urls} from "../config/urls";

export const reasons = new webix.DataCollection({
	url: urls.statusReasons,
	save: `rest->${urls.statusReasons}`
});
