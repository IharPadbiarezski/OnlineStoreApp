import {JetView} from "webix-jet";
import {phones} from "../models/phones";

export default class PhonesTable extends JetView {
	config() {
		return {
			view: "datatable",
			scroll: "y",
			columns: [
				{
					id: "image",
					header: "Image",
					template: obj => `<img scr=${obj.image} />`
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
					header: "Amount"
				}
			]
			// onClick: {
			// 	"wxi-pencil": (e, id) => {
			// 		const item = this.getRoot().getItem(id);
			// 		this.form.showForm(item);
			// 	}
			// }
		};
	}

	init(view) {
		phones.waitData.then(() => {
			view.sync(phones);
		});
	}
}
