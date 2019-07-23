import {JetView} from "webix-jet";
import {phoneModels} from "../models/phoneModels";
import PhonesTable from "./phonesTable";
import {phones} from "../models/phones";
import Storage from "./localStorage/localStorage";

export default class TopView extends JetView {
	config() {
		const toolBar = {
			view: "toolbar",
			height: 56,
			css: "toolbar__bg",
			elements: [
				{view: "label", label: "Varin Shop", css: "toolbar__element"},
				{},
				{view: "label", label: "Hi, varias!", css: "toolbar__element"},
				{},
				{
					cols: [
						{
							view: "button",
							css: "webix_transparent toolbar__element",
							label: "Logout"
						},
						{
							view: "button",
							css: "webix_transparent toolbar__element",
							label: "History"
						},
						{
							view: "button",
							localId: "bag",
							css: "webix_transparent toolbar__element",
							value: "Bag",
							onClick: () => {
								console.log("hi")
							}
						}
					]
				}
			]
		};

		const ui = {
			type: "clean",
			paddingX: 5,
			css: "app_layout",
			rows: [
				toolBar,
				{
					cols: [
						{
							view: "tree",
							localId: "tree",
							width: 220,
							select: true,
							css: "phones__tree",
							on: {
								onAfterSelect: (id) => {
									const phoneName = this.$$("tree").getItem(id).value.toLowerCase();
									if (phoneName !== "phones") {
										phones.data.filter(item => item.name.toLowerCase().includes(phoneName));
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
								{$subview: PhonesTable}
							]
						}
					]
				}
			]
		};

		return ui;
	}

	init() {
		phoneModels.waitData.then(() => {
			this.$$("tree").sync(phoneModels);
		});

		const phonesAmount = Storage.getPhonesFromStorage().length;
		

		this.on(this.app, "bag:setvalue", (value) => {
			this.$$("bag").setValue(`Bag(${value})`);
		});

		this.app.callEvent("bag:setvalue", [phonesAmount]);
	}
}
