import {JetView} from "webix-jet";
import {phones} from "../models/phones";

export default class PhonesTable extends JetView {
	config() {
		return {
			view: "datatable",
			scroll: "y",
			rowHeight: 60,
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
					template: "{common.count()}"
				},
				{
					id: "Buy",
					template: "<span class='useremail mdi mdi-cart-outline shoppingCart'></span>",
					width: 60
				}

			],
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
		});
	}
}
