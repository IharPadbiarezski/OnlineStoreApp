import {JetView} from "webix-jet";
import Cookies from "./cookies/cookies";

export default class TopView extends JetView {
	config() {
		const toolBar = {
			view: "toolbar",
			height: 56,
			css: "toolbar__bg",
			elements: [
				{
					view: "label",
					label: "Varin Shop",
					css: "toolbar__element"
				},
				{},
				{
					view: "label",
					localId: "userGreeting",
					css: "toolbar__element"
				},
				{},
				{
					cols: [
						{
							view: "button",
							css: "webix_transparent toolbar__element",
							label: "Logout",
							click: () => {
								this.show("/logout");
								Cookies.deleteCookie("userName");
							}
						},
						{
							view: "button",
							css: "webix_transparent toolbar__element",
							label: "History",
							click: () => {
								this.app.callEvent("screen:show", ["history"]);
							}
						},
						{
							view: "button",
							localId: "bag",
							css: "webix_transparent toolbar__element",
							value: "Bag",
							click: () => {
								this.app.callEvent("screen:show", ["bag"]);
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
				{$subview: true}
			]
		};

		return ui;
	}

	init() {
		if (this.app.config.access === "admin") {
			this.show("admin/clientsinfo");
		}

		this.on(this.app, "bag:setvalue", (value) => {
			let amountBag = `(${value})`;
			if (!value || value === 0) {
				amountBag = "";
			}
			this.$$("bag").setValue(`Bag${amountBag}`);
		});

		const userName = Cookies.readCookie("userName");
		this.$$("userGreeting").setValue(`Hi, ${userName}`);
	}
}
