import {JetView} from "webix-jet";
import {getData} from "../models/phonesFromLS";
import Storage from "./localStorage/localStorage";

export default class PhonesTable extends JetView {
	config() {
		const datatable = {
			view: "datatable",
			localId: "datatable",
			scroll: true,
			rowHeight: 60,
			gravity: 3,
			columns: [
				{
					id: "image",
					header: "Image",
					template: obj => `<img class="phone__image" src=${obj.image} />`
				},
				{
					id: "name",
					header: "Name",
					fillspace: true
				},
				{
					id: "rating",
					header: "Rating"
				},
				{
					id: "amount",
					header: "Amount"
				},
				{
					id: "price",
					header: "Price"
				},
				{
					id: "sum",
					header: "Sum",
					width: 100
				},
				{
					id: "",
					template: "<span class='webix_icon wxi-trash bag__delete-icon deleteIcon'></span>",
					width: 80
				}

			],
			onClick: {
				shoppingCart: (e, id, node) => {

				},
				deleteIcon: (e, id) => {
					webix.confirm({
						text: "The phote will be deleted. Deleting cannot be undone... <br/> Are you sure?",
						ok: "OK",
						cancel: "Cancel"
					}).then(() => {
						if (id) {
							const deletedPhoneSum = this.$$("datatable").getItem(id.row).sum;
							Storage.removePhoneLocalStorage(id.row);
							this.$$("datatable").remove(id.row);
							this.total.sum -= deletedPhoneSum;
							this.$$("totalSumTemplate").setValues(this.total);
							const phonesLengthLS = Storage.getPhonesFromStorage().length;
							this.app.callEvent("bag:setvalue", [phonesLengthLS]);
						}
					});
					return false;
				}
			}
		};
		const template = {
			height: 60,
			css: "total__template",
			cols: [
				{
					template: "Total:"
				},
				{
					localId: "totalSumTemplate",
					template: obj => obj.sum,
					width: 100
				},
				{
					width: 80,
					template: " "
				}
			]
		};

		const toolbar = {
			view: "toolbar",
			padding: 0,
			elements: [
				{
					view: "button",
					label: "Make order",
					css: "make-order__button",
					width: 300,
					align: "left",
					click: () => {
						console.log("button");
					}
				}
			]
		};

		return {
			rows: [
				datatable,
				template,
				toolbar
			]
		};
	}

	init() {
		const phonesLS = getData();
		this.total = {
			sum: 0
		};
		phonesLS.forEach((phone) => {
			let amount = 2;
			phone.sum = amount * phone.price;
			this.total.sum += phone.sum;
		});
		this.$$("totalSumTemplate").setValues(this.total);
		this.$$("datatable").parse(phonesLS);
	}
}
