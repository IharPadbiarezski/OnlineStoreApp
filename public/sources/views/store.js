import {JetView} from "webix-jet";
import PhoneInfoWindow from "./windows/phoneInfo";
import {phones} from "../models/phones";
import Storage from "./localStorage/localStorage";

export default class PhonesTable extends JetView {
	config() {
		return {
			view: "datatable",
			scroll: "y",
			rowHeight: 60,
			type: {
				counter(obj, common, value) {
					let html = "<div class='webix_el_group phone__counter'>";
					html += "<button type='button' class='webix_inp_counter_prev phone-counter__button' tabindex='-1' >-</button>";
					html += `<input type='text' readonly class='webix_inp_counter_value' style='height:28px;' value='${value}'></input>`;
					html += "<button type='button' class='webix_inp_counter_next phone-counter__button' tabindex='-1'>+</button></div>";
					return html;
				}
			},
			onClick: {
				webix_inp_counter_prev(e, id) {
					let item = this.getItem(id.row);
					item[id.column] -= 1;
					this.updateItem(id.row);
				},
				webix_inp_counter_next(e, id) {
					let item = this.getItem(id.row);
					item[id.column] += 1;
					this.updateItem(id.row);
				},
				shoppingCart: (e, id) => {
					const phone = this.getRoot().getItem(id);
					if (phone.amount === 0) {
						webix.message({type: "error", text: "Please, select at least one!"});
					}
					else {
						const phonesLS = Storage.getPhonesFromStorage();
						phonesLS.forEach((phoneLS, index) => {
							if (+phoneLS.id === +id) {
								phonesLS.splice(index, 1);
							}
						});
						phone.sum = phone.amount * phone.price;
						localStorage.setItem("phones", JSON.stringify(phonesLS));
						Storage.saveIntoStorage(phone);
						webix.message(`${phone.name} has been added to your bag`);
						const phonesTotalAmount = Storage.getTotalAmount();
						this.app.callEvent("bag:setvalue", [phonesTotalAmount]);
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
				onItemDblClick: (id) => {
					const values = this.getRoot().getItem(id);
					this.phoneInfo.showWindow(values);
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
