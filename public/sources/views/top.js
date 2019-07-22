import {JetView} from "webix-jet";
import {phoneModels} from "../models/phoneModels.js";

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
							css: "webix_transparent toolbar__element",
							label: "Bag"
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
							on: {
								onAfterSelect: (id) => {
									console.log(id);
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
				}
			]
		};

		return ui;
	}

	init() {
		phoneModels.waitData.then(() => {
			this.$$("tree").sync(phoneModels);
		});
	}
}
