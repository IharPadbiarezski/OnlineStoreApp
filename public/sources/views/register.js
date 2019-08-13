import {JetView} from "webix-jet";
import {urls} from "../config/urls";
import Cookies from "./cookies/cookies";

export default class RegisterForm extends JetView {
	get formId() {
		return "registerForm";
	}

	config() {
		const registerHeader = {
			type: "header",
			template: "Register",
			css: "login__header"
		};

		const registerForm = {
			view: "form",
			localId: this.formId,
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
					labelAlign: "right"
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
								const form = this.getForm();
								form.clearValidation();
								if (form.validate()) {
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
				password: (value) => {
					const passwordConf = this.getForm().getValues().passwordConf;
					return value === passwordConf && value.length > 0;
				}
			}
		};

		return {
			rows: [
				registerHeader,
				registerForm,
				{}
			]
		};
	}

	init(view) {
		view.$view.querySelector("input").focus();
	}

	getForm() {
		return this.$$(`${this.formId}`);
	}

	doRegister() {
		const values = this.getForm().getValues();
		values.date = new Date();
		webix.ajax().post(urls.register, values, (response) => {
			if (!JSON.parse(response).error) {
				const user = this.app.getService("user");
				user.login(values.email, values.password).then(() => {
					const userName = user.getUser().name;
					let today = new Date();
					let nextYear = today.getFullYear() + 1;
					let month = today.getMonth();
					let date = today.getDate();
					Cookies.createCookie("userName", userName, Date.UTC(nextYear, month, date));
				});
			}
			else {
				this.registerError = JSON.parse(response).error;
				this.getForm().markInvalid("email", this.registerError);
			}
		});
	}
}
