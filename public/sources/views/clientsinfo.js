import {JetView} from "webix-jet";
import {clientsInfo} from "../models/clients";

export default class ClientsInfoView extends JetView {
	config() {
		return {
			view: "datatable",
			scroll: "y",
			rowHeight: 60,
			columns: [
				{
					id: "customId",
					header: "#"
				},
				{
					id: "Name",
					header: ["Name", {content: "textFilter"}],
					fillspace: true
				},
				{
					id: "Email",
					header: ["Email", {content: "textFilter"}],
					fillspace: true
				},
				{
					id: "CreationDate",
					header: "Created at",
					width: 150
				}
			]
		};
	}

	init(view) {
		view.sync(clientsInfo);
	}
}
