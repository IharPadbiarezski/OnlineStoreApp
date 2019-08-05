import {JetView} from "webix-jet";
import Cookies from "./cookies/cookies";
import AdminView from "./admin";
import StoreAllView from "./store";

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
					css: "toolbar__element header__logo"
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
							localId: "history",
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
				toolBar
			]
		};
		let view = StoreAllView;
		if (this.app.config.access === "admin") {
			view = AdminView;
		}
		ui.rows.push(view);
		return ui;
	}

	init() {
		if (this.app.config.access && this.app.config.access === "admin") {
			this.$$("bag").hide();
			this.$$("history").hide();
		}

		this.on(this.app, "bag:setvalue", (value) => {
			let amountBag = `(${value})`;
			if (!value || value === 0) {
				amountBag = "";
			}
			this.$$("bag").setValue(`Bag${amountBag}`);
		});
		const user = this.app.getService("user");
		const userName = user.getUser().name;
		this.setGreeting(userName);
	}

	setGreeting(name) {
		this.$$("userGreeting").setValue(`Hi, ${name}!`);
	}
}
