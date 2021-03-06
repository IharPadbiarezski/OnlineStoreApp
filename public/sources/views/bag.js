import {JetView} from "webix-jet";
import {getData} from "../models/phonesFromLS";
import Storage from "./localStorage/localStorage";

export default class PhonesTable extends JetView {
	get datatableId() {
		return "datatable";
	}

	get templateId() {
		return "totalSumTemplate";
	}

	config() {
		const datatable = {
			view: "datatable",
			localId: this.datatableId,
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
				deleteIcon: (e, id) => {
					webix.confirm({
						text: "The phote will be deleted. Deleting cannot be undone... <br/> Are you sure?",
						ok: "OK",
						cancel: "Cancel"
					}).then(() => {
						if (id) {
							const deletedPhoneSum = this.getDatatable().getItem(id.row).sum;
							Storage.removePhoneLocalStorage(id.row);
							this.getDatatable().remove(id.row);
							this.total.sum -= deletedPhoneSum;
							this.getTemplate().setValues(this.total);
							let phonesTotalAmount = Storage.getTotalAmount();
							this.app.callEvent("bag:setvalue", [phonesTotalAmount]);
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
					localId: this.templateId,
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
						this.app.callEvent("screen:show", ["order"]);
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
		if (phonesLS) {
			phonesLS.forEach((phone) => {
				this.total.sum += phone.sum;
			});
			this.getDatatable().parse(phonesLS);
		}
		this.getTemplate().setValues(this.total);
	}

	getDatatable() {
		return this.$$(`${this.datatableId}`);
	}

	getTemplate() {
		return this.$$(`${this.templateId}`);
	}
}
