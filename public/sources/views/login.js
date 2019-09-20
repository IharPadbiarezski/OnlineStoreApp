import {JetView} from "webix-jet";

export default class LoginView extends JetView {
	config() {
		const toolBar = {
			view: "toolbar",
			height: 56,
			css: "toolbar-login__bg",
			cols: [
				{
					view: "label",
					label: "Varin Shop",
					css: "toolbar-login__element  header__logo"
				},
				{},
				{
					cols: [
						{
							view: "button",
							css: "webix_transparent toolbar-login__element",
							label: "Login",
							autowidth: true,
							click: () => this.show("signin")
						},
						{
							view: "button",
							css: "webix_transparent toolbar-login__element",
							label: "Register",
							autowidth: true,
							click: () => this.show("register")
						}
					]
				}
			]
		};

		return {
			rows: [
				toolBar,
				{
					rows: [
						{gravity: 0.2},
						{
							cols: [
								{},
								{$subview: true},
								{}
							]
						}
					]
				}
			]
		};
	}

	init() {
		this.on(this.app, "password:reset", () => {
			this.show("reset");
		});
		this.show("signin");
	}
}
