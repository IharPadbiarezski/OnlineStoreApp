import {urls} from "../config/urls";

export const clientsInfo = new webix.DataCollection({
	url: urls.clients,
	save: `rest->${urls.clients}`
});
