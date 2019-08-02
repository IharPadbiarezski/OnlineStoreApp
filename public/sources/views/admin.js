import {JetView, plugins} from "webix-jet";

export default class AdminView extends JetView {
	config() {
		const menu = {
			view: "menu",
			localId: "menu",
			width: 250,
			layout: "y",
			select: true,
			css: "admin__menu",
			data: [
				{value: "Clients Info", id: "clientsinfo"},
				{value: "Orders", id: "orders"},
				{value: "New Product", id: "newproduct"}
			]
		};

		const ui = {
			cols: [
				menu,
				{$subview: true}
			]
		};

		return ui;
	}

	init() {
		this.use(plugins.Menu, "menu");
		this.show("clientsinfo");
	}
}
