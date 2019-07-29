import {JetView} from "webix-jet";
import {deliveryTypes} from "../models/deliveryTypes";
import {paymentTypes} from "../models/paymentTypes";
import Storage from "./localStorage/localStorage";
import {orders} from "../models/orders";

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
							const values = this.getRoot().getValues();
							const allPnonesLS = Storage.getPhonesFromStorage();
							allPnonesLS.forEach((phone) => {
								let order = {
									Product: phone.name,
									Amount: phone.amount,
									DeliveryAddress: values.DeliveryAddress,
									DeliveryType: values.DeliveryType,
									PaymentType: values.PaymentType,
									Status: "In process",
									OrderDate: new Date()
								};
								orders.add(order);
							});
							Storage.clearLocalStorage();
							this.app.callEvent("bag:setvalue");
							this.app.callEvent("screen:show", ["history"]);
							webix.message({type: "success", text: "Order created successfully!"});
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
