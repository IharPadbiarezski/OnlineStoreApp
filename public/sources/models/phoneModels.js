import {urls} from "../config/urls";

export const phoneModels = new webix.TreeCollection({
	url: urls.phoneModels,
	save: `rest->${urls.phoneModels}`
});
