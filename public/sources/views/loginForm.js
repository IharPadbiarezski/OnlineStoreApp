import {JetView} from "webix-jet";

export default class LoginForm extends JetView {
	config() {
		const loginForm = {
			view: "form",
			localId: "loginForm",
			width: 600,
			borderless: false,
			margin: 10,
			rows: [
				{
					view: "text",
					name: "login",
					label: "E-Mail Address",
					labelAlign: "right"
				},
				{
					view: "text",
					type: "password",
					name: "pass",
					label: "Password",
					labelAlign: "right"
				},
				{
					view: "checkbox",
					name: "remember",
					labelRight: "Remember me",
					labelPosition: "top",
					css: "login__checkbox",
					width: 100,
					checkValue: "Available",
					uncheckValue: "Unavailable"
				},
				{
					css: "login-button-container",
					cols: [
						{
							view: "button",
							value: "Login",
							click: () => this.doLogin(),
							hotkey: "enter",
							css: "login__button",
							autowidth: true
						},
						{
							template: "<a target='_blank' href='http://docs.webix.com'>Forgot Your Password</a>",
							autowidth: true,
							borderless: true,
							width: 200
						}
					]
				}
			],
			elementsConfig: {
				labelWidth: 150
			},
			rules: {
				login: webix.rules.isEmail,
				pass: webix.rules.isNotEmpty
			}
		};

		return loginForm;
	}

	init(view) {
		// this.show("loginForm");
		view.$view.querySelector("input").focus();
	}

	doLogin() {
		const user = this.app.getService("user");
		const form = this.$$("loginForm");
		const ui = this.$$("loginTop");

		if (form.validate()) {
			const data = form.getValues();
			user.login(data.login, data.pass).catch(() => {
				webix.html.removeCss(ui.$view, "invalid_login");
				form.elements.pass.focus();
				webix.delay(() => {
					webix.html.addCss(ui.$view, "invalid_login");
				});
			});
		}
	}
}
