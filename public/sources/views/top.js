import {JetView} from "webix-jet";
import AdminView from "./admin";
import StoreAllView from "./store";

export default class TopView extends JetView {
	get greetingId() {
		return "userGreeting";
	}

	get historyButtonId() {
		return "history";
	}

	get bagButtonId() {
		return "bag";
	}

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
					localId: this.greetingId,
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
							}
						},
						{
							view: "button",
							css: "webix_transparent toolbar__element",
							localId: this.historyButtonId,
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
		const user = this.app.getService("user");
		this.userName = user.getUser().name;
		let view = StoreAllView;
		if (this.userName === "admin") {
			view = AdminView;
		}
		ui.rows.push(view);
		return ui;
	}

	init() {
		if (this.userName === "admin") {
			this.getBag().hide();
			this.$$(`${this.historyButtonId}`).hide();
		}

		this.on(this.app, "bag:setvalue", (value) => {
			let amountBag = `(${value})`;
			if (!value || value === 0) {
				amountBag = "";
			}
			this.getBag().setValue(`Bag${amountBag}`);
		});
		const user = this.app.getService("user");
		const userName = user.getUser().name;
		this.setGreeting(userName);
	}

	getBag() {
		return this.$$(`${this.bagButtonId}`);
	}

	setGreeting(name) {
		this.$$(`${this.greetingId}`).setValue(`Hi, ${name}!`);
	}
}
