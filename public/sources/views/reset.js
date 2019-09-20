import {JetView} from "webix-jet";
import {urls} from "../config/urls";

export default class ResetForm extends JetView {
	get formId() {
		return "resetPassForm";
	}

	config() {
		const resetPassHeader = {
			type: "header",
			template: "Reset Passwaord",
			css: "login__header"
		};

		const resetPassForm = {
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
					labelAlign: "right"
				},
				{
					css: "login-button-container",
					cols: [
						{
							view: "button",
							value: "Send Password Reset Link",
							hotkey: "enter",
							css: "login__button",
							autowidth: true,
							click: () => {
								const resetForm = this.getForm();
								this.doResetPassword(resetForm);
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
			rows: [
				resetPassHeader,
				resetPassForm,
				{}
			]
		};
	}

	init(view) {
		view.$view.querySelector("input").focus();
	}

	getForm() {
		return this.getForm(`${this.formId}`);
	}

	doResetPassword(form) {
		const values = form.getValues();
		webix.ajax().post(urls.resetPassword, values, (response) => {
			const parsedResponse = JSON.parse(response);
			const success = parsedResponse.success;
			const error = parsedResponse.error;
			if (success) {
				webix.message({type: "success", text: `${success}`});
				form.clearValidation();
				form.clear();
			}
			if (error) {
				this.getForm().markInvalid("email", error);
			}
		});
	}
}
