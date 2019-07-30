import {urls} from "../config/urls";

export const phoneModels = new webix.DataCollection({
	url: urls.phoneModels,
	save: `rest->${urls.phoneModels}`
});
