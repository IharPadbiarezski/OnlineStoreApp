import {JetView} from "webix-jet";
import {phoneModels} from "../models/phoneModels";
import {phones} from "../models/phones";
import Storage from "./localStorage/localStorage";

export default class StoreAllView extends JetView {
	get treeId() {
		return "tree";
	}

	config() {
		return {
			cols: [
				{
					view: "tree",
					localId: this.treeId,
					width: 220,
					select: true,
					css: "phones__tree",
					on: {
						onAfterSelect: (id) => {
							this.show("products");
							const phoneName = this.getTree().getItem(id).value.toLowerCase();
							if (phoneName !== "phones") {
								phones.waitData.then(() => {
									phones.data.filter(item => item.name.toLowerCase().includes(phoneName));
								});
							}
							else {
								phones.data.filter();
							}
						}
					}
				},
				{
					type: "wide",
					rows: [
						{$subview: true}
					]
				}
			]
		};
	}

	init() {
		phoneModels.waitData.then(() => {
			this.getTree().sync(phoneModels);
		});

		this.show("products");

		this.on(this.app, "screen:show", (name) => {
			this.show(name);
		});

		const phonesTotalAmount = Storage.getTotalAmount();
		this.app.callEvent("bag:setvalue", [phonesTotalAmount]);
	}

	getTree() {
		return this.$$(`${this.treeId}`);
	}
}
