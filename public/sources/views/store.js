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
					css: "phones__counter",
					on: {
						onChange: (newVal, oldVal) => {
							// console.log(newVal);
							// console.log(val)
						}
					},
					onClick: (e, id) => {
						console.log("hi");
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
				shoppingCart: (e, id, node) => {
					console.log(id, e, node);

					const phone = this.getRoot().getItem(id);
					const phonesLS = Storage.getPhonesFromStorage();
					phonesLS.forEach((phoneLS, index) => {
						if (+phoneLS.id === +id) {
							phonesLS.splice(index, 1);
						}
					});
					localStorage.setItem("phones", JSON.stringify(phonesLS));
					Storage.saveIntoStorage(phone);
					webix.message(`${phone.name} has been added to your bag`);
					this.app.callEvent("bag:setvalue", [phonesLS.length + 1]);
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
