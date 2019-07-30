import {JetView} from "webix-jet";
import {clientsInfo} from "../models/clients";

export default class ClientsInfoView extends JetView {
	config() {
		return {
			view: "datatable",
			scroll: "y",
			rowHeight: 60,
			editable: true,
			editaction: "dblclick",
			columns: [
				{
					id: "id",
					header: "#"
				},
				{
					id: "Name",
					header: ["Name", {content: "textFilter"}],
					fillspace: true,
					editor: "text"
				},
				{
					id: "Email",
					header: ["Email", {content: "textFilter"}],
					fillspace: true,
					editor: "text"
				},
				{
					id: "CreationDate",
					header: "Created at",
					width: 150,
					editor: "date"
				}
			],
			rules: {
				Name: webix.rules.isNotEmpty,
				Email: webix.rules.isEmail
			}
		};
	}

	init(view) {
		view.sync(clientsInfo);
	}
}
