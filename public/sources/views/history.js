import {JetView} from "webix-jet";
import DeclineReasonsWindow from "./windows/declineReasons";
import {orders} from "../models/orders";
import {deliveryTypes} from "../models/deliveryTypes";
import {paymentTypes} from "../models/paymentTypes";
import {declineReasons} from "../models/declineReasons";

export default class PhonesTable extends JetView {
	config() {
		return {
			view: "datatable",
			scroll: "y",
			rowHeight: 60,
			columns: [
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
					id: "DeliveryAddress",
					header: "Address"
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
					css: "statusCell"
				}
			],
			onClick: {
				statusCell: (e, id) => {
					const status = this.getRoot().getItem(id.row).Status;
					if (status === "Declined") {
						const order = this.getRoot().getItem(id);
						const reason = declineReasons.find(declineReason => declineReason.orderId === order.id);
						this.declineReasons.showWindow(reason[0]);
					}
					return false;
				}
			}
		};
	}

	init(view) {
		orders.waitData.then(() => {
			view.sync(orders);
			this.declineReasons = this.ui(DeclineReasonsWindow);
		});
	}
}