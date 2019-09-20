import {JetView} from "webix-jet";
import {orders} from "../models/orders";
import {deliveryTypes} from "../models/deliveryTypes";
import {paymentTypes} from "../models/paymentTypes";
import {statuses} from "../models/statuses";
import StatusWindow from "./windows/status";

export default class ClientsInfoView extends JetView {
	get datatableId() {
		return "ordersTable";
	}

	config() {
		return {
			view: "datatable",
			localId: this.datatableId,
			scroll: true,
			rowHeight: 60,
			columns: [
				{
					id: "customId",
					header: "#",
					width: 40
				},
				{
					id: "Product",
					header: ["Product", {content: "textFilter"}],
					fillspace: true
				},
				{
					id: "Amount",
					header: "Amount"
				},
				{
					id: "Name",
					header: ["Buyer name", {content: "textFilter"}]
				},
				{
					id: "Email",
					header: ["Buyer email", {content: "textFilter"}],
					fillspace: true
				},
				{
					id: "Phone",
					header: "Phone",
					fillspace: true
				},
				{
					id: "DeliveryAddress",
					header: "Address",
					fillspace: true
				},
				{
					id: "DeliveryType",
					header: "Delivery",
					options: deliveryTypes
				},
				{
					id: "PaymentType",
					header: "Payment",
					options: paymentTypes
				},
				{
					id: "OrderDate",
					header: "Order date",
					width: 150
				},
				{
					id: "Status",
					header: "Status",
					width: 150,
					css: "statusCell",
					options: statuses,
					editor: "combo"
				}
			],
			onClick: {
				statusCell: (e, id) => {
					const values = orders.getItem(id.row);
					this.statusWindow.showWindow(values);
				}
			}
		};
	}

	init(view) {
		view.sync(orders);
		this.statusWindow = this.ui(StatusWindow);

		this.on(this.app, "orderstable:refresh", () => {
			this.$$(`${this.datatableId}`);
		});
	}
}

