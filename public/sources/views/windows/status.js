import {JetView} from "webix-jet";
import {statuses} from "../../models/statuses";
import {orders} from "../../models/orders";
import {reasons} from "../../models/declineReasons";

export default class StatusWindow extends JetView {
	config() {
		const toolbar = {
			view: "toolbar",
			height: 56,
			css: "toolbar__bg",
			elements: [
				{
					view: "label",
					label: "Change status",
					css: "toolbar__element"
				},
				{},
				{
					view: "button",
					type: "icon",
					css: "webix_primary photo_info_close__btn",
					icon: "wxi-close",
					width: 30,
					click: () => {
						this.hideWindow();
					}
				}
			]
		};

		const form = {
			view: "form",
			localId: "form",
			rows: [
				{
					view: "combo",
					name: "Status",
					label: "Choose status",
					options: statuses,
					on: {
						onChange: (newId) => {
							if (newId) {
								this.status = statuses.getItem(newId).value.toLowerCase();
								if (this.status !== "declined") {
									this.$$("statusReason").hide();
								}
								else {
									this.$$("statusReason").show();
								}
							}
						}
					}
				},
				{
					view: "textarea",
					name: "DeclinedReason",
					label: "Indicate reason",
					localId: "statusReason",
					hidden: true,
					height: 100
				},
				{
					view: "button",
					value: "Save",
					hotkey: "enter",
					css: "save-status__button",
					click: () => {
						const values = this.$$("form").getValues();
						orders.updateItem(values.id, values);
						if (this.status === "declined") {
							const reason = {
								OrderId: values.id,
								Reason: values.DeclinedReason
							};
							if (values.ReasonId) {
								reasons.updateItem(values.ReasonId, reason);
							}
							else {
								reasons.add(reason);
							}
						}
						else if (this.status !== "declined") {
							if (values.ReasonId) {
								reasons.remove(values.ReasonId);
								values.ReasonId = "";
								values.DeclinedReason = "";
							}
						}
						this.hideWindow();
						this.$$("form").clear();
					}
				}
			],
			elementsConfig: {
				labelWidth: 150
			}
		};

		return {
			view: "window",
			head: false,
			position: "center",
			modal: true,
			body: {
				width: 600,
				rows: [
					toolbar,
					form
				]
			}
		};
	}

	showWindow(values) {
		reasons.waitData.then(() => {
			const statusReason = reasons.find(reason => +reason.OrderId === +values.id);
			if (statusReason.length > 0) {
				values.DeclinedReason = statusReason[0].Reason;
				if (statusReason[0].id) {
					values.ReasonId = statusReason[0].id;
				}
			}
			this.$$("form").setValues(values);
		});
		this.getRoot().show();
	}

	hideWindow() {
		this.getRoot().hide();
	}
}