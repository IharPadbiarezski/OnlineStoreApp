import {JetView} from "webix-jet";
import PhoneInfoWindow from "./windows/phoneInfo";
import {phones} from "../models/phones";

export default class PhonesTable extends JetView {
	config() {
		webix.protoUI({
			name: "phonesTable"
		}, webix.ui.datatable, webix.ActiveContent);

		return {
			view: "phonesTable",
			scroll: "y",
			rowHeight: 60,
			activeContent: {
				counter: {
					view: "counter",
					width: 120,
					css: "phones__counter",
					on: {
						onChange: (newVal, oldVal) => {
							console.log(newVal);
						}
					}
				}
			},
			columns: [
				{
					id: "image",
					header: "Image",
					template: obj => `<img class="phone__image" src=${obj.image} />`
				},
				{
					id: "name",
					header: ["Name", {content: "textFilter"}],
					fillspace: true
				},
				{
					id: "price",
					header: "Price"
				},
				{
					id: "rating",
					header: "Rating"
				},
				{
					id: "amount",
					header: "Amount",
					width: 120,
					template: "{common.counter()}"
				},
				{
					id: "Buy",
					template: "<span class='useremail mdi mdi-cart-outline shoppingCart'></span>",
					width: 60
				}

			],
			on: {
				onItemDblClick: (id, e, node) => {
					// console.log(id, e, node);
					const values = this.getRoot().getItem(id);
					this.phoneInfo.showWindow(values);
				}
			},
			onClick: {
				shoppingCart: (e, id) => {
					console.log(`Here I am. id is ${id}`);
				}
			}
		};
	}

	init(view) {
		phones.waitData.then(() => {
			view.sync(phones);
			this.phoneInfo = this.ui(PhoneInfoWindow);
		});
	}
}
