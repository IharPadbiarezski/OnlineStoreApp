import {JetView} from "webix-jet";
import Cookies from "./cookies/cookies";

export default class SigninView extends JetView {
	get formId() {
		return "loginForm";
	}

	get checkBoxId() {
		return "rememberCheckbox";
	}

	get loginTopId() {
		return "loginTop";
	}

	config() {
		const loginHeader = {
			type: "header",
			template: "Login",
			css: "login__header"
		};

		const loginForm = {
			view: "form",
			localId: this.formId,
			width: 600,
			borderless: false,
			margin: 10,
			rows: [
				{
					view: "text",
					name: "email",
					label: "E-Mail Address",
					labelAlign: "right",
					invalidMessage: "Incorrect email!"
				},
				{
					view: "text",
					type: "password",
					name: "password",
					label: "Password",
					labelAlign: "right"
				},
				{
					view: "checkbox",
					name: "remember",
					localId: this.checkBoxId,
					labelRight: "Remember me",
					labelPosition: "top",
					css: "login__checkbox",
					width: 100,
					checkValue: "Yes",
					uncheckValue: "No"
				},
				{
					css: "login-button-container",
					cols: [
						{
							view: "button",
							value: "Login",
							hotkey: "enter",
							css: "login__button",
							autowidth: true,
							click: () => {
								const form = this.getForm();
								let values = form.getValues();
								this.doLogin(form, values);
								if (values.remember === "Yes") {
									let today = new Date();
									let nextYear = today.getFullYear() + 1;
									let month = today.getMonth();
									let date = today.getDate();
									Cookies.createCookie("email", values.email, Date.UTC(nextYear, month, date));
									Cookies.createCookie("password", values.password, Date.UTC(nextYear, month, date));
								}
								else {
									const email = Cookies.readCookie("email");
									const password = Cookies.readCookie("password");
									if (email) {
										Cookies.deleteCookie("email");
									}
									if (password) {
										Cookies.deleteCookie("password");
									}
								}
							}
						},
						{
							view: "button",
							value: "Forgot Your Password",
							css: "reset-password__button",
							autowidth: true,
							click: () => {
								this.app.callEvent("password:reset");
							}
						}
					]
				}
			],
			elementsConfig: {
				labelWidth: 150
			}
		};

		return {
			localId: this.loginTopId,
			rows: [
				loginHeader,
				loginForm,
				{}
			]
		};
	}

	init(view) {
		view.$view.querySelector("input").focus();
		this.setValuesIntoForm();
	}

	getForm() {
		return this.$$(`${this.formId}`);
	}

	setValuesIntoForm() {
		const form = this.getForm();
		const email = Cookies.readCookie("email");
		const password = Cookies.readCookie("password");
		const remember = "Yes";
		if (email && password) {
			const values = {email, password, remember};
			form.setValues(values);
		}
	}

	doLogin(view, values) {
		const user = this.app.getService("user");
		const ui = this.$$(`${this.loginTopId}`);

		if (view && view.validate()) {
			user.login(values.email, values.password).catch(() => {
				webix.html.removeCss(ui.$view, "invalid_login");
				view.elements.password.focus();
				webix.delay(() => {
					webix.html.addCss(ui.$view, "invalid_login");
				});
			}).then(() => {
				const userName = user.getUser().name;
				let today = new Date();
				let nextYear = today.getFullYear() + 1;
				let month = today.getMonth();
				let date = today.getDate();
				Cookies.createCookie("userName", userName, Date.UTC(nextYear, month, date));
			});
		}
	}
}
