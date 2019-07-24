import {JetView} from "webix-jet";
import PhoneInfoWindow from "./windows/phoneInfo";
import {phones} from "../models/phones";
import Storage from "./localStorage/localStorage";

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
					localId: "counter",
					css: "phones__counter"
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
				onItemDblClick: (id) => {
					const values = this.getRoot().getItem(id);
					this.phoneInfo.showWindow(values);
				}
			},
			onClick: {
				shoppingCart: (e, id) => {
					const phone = this.getRoot().getItem(id);
					if (!phone.counter) {
						webix.message({type: "error", text: "Please, select at least one!"});
					}
					else {
						const phonesLS = Storage.getPhonesFromStorage();
						phonesLS.forEach((phoneLS, index) => {
							if (+phoneLS.id === +id) {
								phonesLS.splice(index, 1);
							}
						});
						phone.sum = phone.counter * phone.price;
						localStorage.setItem("phones", JSON.stringify(phonesLS));
						Storage.saveIntoStorage(phone);
						webix.message(`${phone.name} has been added to your bag`);
						const phonesTotalAmount = Storage.getTotalAmount();
						this.app.callEvent("bag:setvalue", [phonesTotalAmount]);
					}
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
