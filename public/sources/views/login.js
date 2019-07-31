import {JetView} from "webix-jet";
import {urls} from "../config/urls";

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
					name: "email",
					label: "E-Mail Address",
					labelAlign: "right"
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
					localId: "rememberCheckbox",
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
								const form = this.$$("loginForm");
								let values = form.getValues();
								this.doLogin(form, values);
								if (values.remember === "Yes") {
									let today = new Date();
									let nextYear = today.getFullYear() + 1;
									let month = today.getMonth();
									let date = today.getDate();
									this.createCookie("email", values.email, Date.UTC(nextYear, month, date));
									this.createCookie("password", values.password, Date.UTC(nextYear, month, date));
								}
								else {
									const email = this.readCookie("email");
									const password = this.readCookie("password");
									if (email) {
										this.deleteCookie("email");
									}
									if (password) {
										this.deleteCookie("password");
									}
								}
							}
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
				email: webix.rules.isEmail,
				password: webix.rules.isNotEmpty
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
					name: "email",
					label: "E-Mail Address",
					labelAlign: "right",
					invalidMessage: "The email has already been taken."
				},
				{
					view: "text",
					type: "password",
					name: "password",
					label: "Password",
					labelAlign: "right",
					invalidMessage: "The password confirmation does not match."
				},
				{
					view: "text",
					type: "password",
					name: "passwordConf",
					label: "Confirm Password",
					labelAlign: "right"
				},
				{
					css: "login-button-container",
					cols: [
						{
							view: "button",
							value: "Register",
							hotkey: "enter",
							css: "login__button",
							autowidth: true,
							click: () => {
								if (this.$$("registerForm").validate()) {
									this.doRegister();
								}
							}
						}
					]
				}
			],
			elementsConfig: {
				labelWidth: 150
			},
			rules: {
				name: webix.rules.isNotEmpty,
				email: webix.rules.isEmail,
				password: (value) => {
					const passwordConf = this.$$("registerForm").getValues().passwordConf;
					return value === passwordConf && value.length > 0;
				}
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
		this.setValuesIntoForm();
	}

	setValuesIntoForm() {
		const form = this.$$("loginForm");
		const email = this.readCookie("email");
		const password = this.readCookie("password");
		const remember = "Yes";
		if (email && password) {
			const values = {email, password, remember};
			form.setValues(values);
		}
	}

	doLogin(view, values) {
		const user = this.app.getService("user");
		const ui = this.$$("loginTop");

		if (view && view.validate()) {
			user.login(values.email, values.password).catch(() => {
				webix.html.removeCss(ui.$view, "invalid_login");
				view.elements.password.focus();
				webix.delay(() => {
					webix.html.addCss(ui.$view, "invalid_login");
				});
			});
		}
	}

	createCookie(key, value, date) {
		let expiration = new Date(date).toUTCString();
		let cookie = `${escape(key)}=${escape(value)};expires=${expiration};`;
		document.cookie = cookie;
	}

	readCookie(name) {
		let key = `${name}=`;
		let cookies = document.cookie.split(";");
		for (let i = 0; i < cookies.length; i++) {
			let cookie = cookies[i];
			while (cookie.charAt(0) === " ") {
				cookie = cookie.substring(1, cookie.length);
			}
			if (cookie.indexOf(key) === 0) {
				return cookie.substring(key.length, cookie.length);
			}
		}
		return null;
	}

	deleteCookie(name) {
		this.createCookie(name, "", -1);
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
		const values = this.$$("registerForm").getValues();
		values.date = new Date();
		webix.ajax().post(urls.register, values);
	}
}
