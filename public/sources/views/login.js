import {JetView} from "webix-jet";

export default class LoginView extends JetView {
	config() {
		const toolBar = {
			view: "toolbar",
			height: 56,
			css: "toolbar-login__bg",
			elements: [
				{
					view: "label",
					label: "Varin Shop",
					css: "toolbar-login__element"
				},
				{},
				{
					cols: [
						{
							view: "button",
							css: "webix_transparent toolbar-login__element",
							label: "Login",
							autowidth: true,
							click: () => {
								if (this.$$("registerForm")) {
									this.hideElement("registerForm");
									this.hideElement("registerHeader");
									this.showElement("loginForm");
									this.showElement("loginHeader");
								}
								if (this.$$("resetPassForm")) {
									this.hideElement("resetPassForm");
									this.hideElement("resetPassHeader");
									this.showElement("loginForm");
									this.showElement("loginHeader");
								}
							}
						},
						{
							view: "button",
							css: "webix_transparent toolbar-login__element",
							label: "Register",
							autowidth: true,
							click: () => {
								if (this.$$("loginForm")) {
									this.hideElement("loginForm");
									this.hideElement("loginHeader");
									this.showElement("registerForm");
									this.showElement("registerHeader");
								}
								if (this.$$("resetPassForm")) {
									this.hideElement("resetPassForm");
									this.hideElement("resetPassHeader");
									this.showElement("registerForm");
									this.showElement("registerHeader");
								}
							}
						}
					]
				}
			]
		};

		const loginHeader = {
			localId: "loginHeader",
			type: "header",
			template: "Login",
			css: "login__header"
		};

		const registerHeader = {
			localId: "registerHeader",
			type: "header",
			template: "Register",
			css: "login__header"
		};

		const resetPassHeader = {
			localId: "resetPassHeader",
			type: "header",
			template: "Reset Passwaord",
			css: "login__header"
		};

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
							hotkey: "enter",
							css: "login__button",
							autowidth: true,
							click: () => this.doLogin()
						},
						{
							view: "button",
							value: "Forgot Your Password",
							hotkey: "enter",
							css: "reset-password__button",
							autowidth: true,
							click: () => {
								this.hideElement("loginForm");
								this.hideElement("loginHeader");
								this.showElement("resetPassForm");
								this.showElement("resetPassHeader");
							}
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

		const registerForm = {
			view: "form",
			localId: "registerForm",
			width: 600,
			borderless: false,
			margin: 10,
			rows: [
				{
					view: "text",
					name: "name",
					label: "Name",
					labelAlign: "right",
					invalidMessage: "The name is required."
				},
				{
					view: "text",
					name: "login",
					label: "E-Mail Address",
					labelAlign: "right",
					invalidMessage: "The email has already been taken."
				},
				{
					view: "text",
					type: "password",
					name: "pass",
					label: "Password",
					labelAlign: "right",
					invalidMessage: "The password confirmation does not match."
				},
				{
					view: "text",
					type: "password",
					name: "confpass",
					label: "Confirm Password",
					labelAlign: "right"
				},
				{
					css: "login-button-container",
					cols: [
						{
							view: "button",
							value: "Register",
							click: () => this.doRegister(),
							hotkey: "enter",
							css: "login__button",
							autowidth: true
						}
					]
				}
			],
			elementsConfig: {
				labelWidth: 150
			},
			rules: {
				name: webix.rules.isNotEmpty,
				login: webix.rules.isEmail,
				pass: webix.rules.isNotEmpty
			}
		};

		const resetPassForm = {
			view: "form",
			localId: "resetPassForm",
			width: 600,
			borderless: false,
			margin: 10,
			rows: [
				{
					view: "text",
					name: "email",
					label: "E-Mail Address",
					labelAlign: "right",
					invalidMessage: "The email has already been taken."
				},
				{
					css: "login-button-container",
					cols: [
						{
							view: "button",
							value: "Send Password Reset Link",
							click: () => this.doResetPassword(),
							hotkey: "enter",
							css: "login__button",
							autowidth: true
						}
					]
				}
			],
			elementsConfig: {
				labelWidth: 150
			},
			rules: {
				email: webix.rules.isEmail
			}
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
								{
									localId: "loginTop",
									rows: [
										registerHeader,
										registerForm,
										loginHeader,
										loginForm,
										resetPassHeader,
										resetPassForm,
										{}
									]},
								{}
							]
						}
					]
				}
			]
		};
	}

	init(view) {
		this.hideElement("registerForm");
		this.hideElement("registerHeader");
		this.hideElement("resetPassForm");
		this.hideElement("resetPassHeader");
		view.$view.querySelector("input").focus();
	}

	doLogin() {
		const user = this.app.getService("user");
		const form = this.$$("loginForm");
		const ui = this.$$("loginTop");

		if (form && form.validate()) {
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

	doResetPassword() {
		// const user = this.app.getService("user");
		// const form = this.$$("loginForm");
		// const ui = this.$$("loginTop");

		// if (form && form.validate()) {
		// 	const data = form.getValues();
		// 	user.login(data.login, data.pass).catch(() => {
		// 		webix.html.removeCss(ui.$view, "invalid_login");
		// 		form.elements.pass.focus();
		// 		webix.delay(() => {
		// 			webix.html.addCss(ui.$view, "invalid_login");
		// 		});
		// 	});
		// }
	}

	showElement(elemId) {
		this.$$(elemId).show();
		this.$$(elemId).show();
	}

	hideElement(elemId) {
		this.$$(elemId).hide();
		this.$$(elemId).hide();
	}

	doRegister() {
		const user = this.app.getService("user");
		const form = this.$$("registerForm");
		const ui = this.$$("registerTop");

		if (form && form.validate()) {
			const data = form.getValues();
			user.register(data.login, data.pass, data.confpass, name).catch(() => {
				webix.html.removeCss(ui.$view, "invalid_login");
				form.elements.pass.focus();
				webix.delay(() => {
					webix.html.addCss(ui.$view, "invalid_login");
				});
			});
		}
	}
}
