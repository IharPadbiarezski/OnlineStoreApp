import {JetView} from "webix-jet";
import {deliveryTypes} from "../models/deliveryTypes";
import {paymentTypes} from "../models/paymentTypes";
import Storage from "./localStorage/localStorage";

export default class ContactForm extends JetView {
	config() {
		const form = {
			margin: 20,
			rows: [
				{
					view: "text",
					name: "Name",
					label: "Your Name",
					placeholder: "Type your name",
					required: true,
					invalidMessage: "Your Name can not to be empty"
				},
				{
					view: "text",
					name: "Email",
					label: "Email",
					required: true,
					placeholder: "Type your email",
					invalidMessage: "Incorrect email"
				},
				{
					view: "text",
					name: "Phone",
					label: "Phone",
					required: true,
					placeholder: "Type your phone number",
					pattern: {mask: "+###-## #######", allow: /[0-9]/g},
					invalidMessage: "Incorrect phone"
				},
				{
					view: "combo",
					name: "DeliveryType",
					label: "Delivery type",
					value: deliveryTypes.getFirstId() || "",
					options: deliveryTypes
				},
				{
					view: "text",
					name: "DeliveryAddress",
					label: "Delivery address",
					required: true,
					placeholder: "Type your address",
					invalidMessage: "Delivery Address can not to be empty"
				},
				{
					view: "combo",
					name: "PaymentType",
					label: "Payment type",
					value: paymentTypes.getFirstId() || "",
					options: paymentTypes
				}
			]
		};

		const buttons = {
			margin: 10,
			cols: [
				{
					view: "button",
					type: "form",
					label: "Checkout",
					css: "checkout__button",
					click: () => {
						if (this.getRoot().validate()) {
							this.app.callEvent("screen:show", ["history"]);
							// Storage.clearLocalStorage();
						}
					}
				}
			]
		};

		return {
			view: "form",
			rows: [
				form,
				{},
				buttons
			],
			rules: {
				Name: webix.rules.isNotEmpty,
				Email: webix.rules.isEmail,
				DeliveryAddress: webix.rules.isNotEmpty
			},
			elementsConfig: {
				labelWidth: 250,
				bottomPadding: 18
			}
		};
	}
}
