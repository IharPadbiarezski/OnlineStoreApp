import {JetView} from "webix-jet";
import {phones} from "../../models/phones";

export default class PhoneInfoWindow extends JetView {
	config() {
		const toolbar = {
			view: "toolbar",
			height: 56,
			css: "toolbar__bg",
			elements: [
				{
					view: "label",
					// label: "Varin Shop",
					localId: "label",
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

		const phoneTemplate = {
			localId: "template",
			template: obj => `
			    <div class="phone-info-container">
			        <div class="photo">
			            <image class="phone-photo" src="${obj.image || "https://upload.wikimedia.org/wikipedia/commons/2/2f/No-photo-m.png"}" />
			        </div>
			        <div class="info">
			            <p><span class="phone-info__name">Name:</span> ${obj.name || "-"}</p>
			            <p><span class="phone-info__price">Price:</span> ${obj.price || ""}$</p>
			            <p><span class="phone-info__rating">Rating:</span> ${obj.rating || "-"} <i class="mdi mdi-star-outline starIcon phone-info__star-icon"></i></p>
			        </div>
			    </div>
            `,
			onClick: {
				starIcon: () => {
                    const id = this.phoneValues.id;
					this.phoneValues.rating++;
                    phones.updateItem(id, this.phoneValues);
                    this.$$("template").refresh();
				}
			}
		};

		return {
			view: "window",
			head: false,
			position: "center",
			modal: true,
			body: {
				width: 600,
				height: 450,
				rows: [
					toolbar,
					phoneTemplate
				]
			}
		};
	}

	showWindow(values) {
		this.phoneValues = values;
		this.$$("label").setValue(values.name);
		this.$$("template").setValues(values);
		this.getRoot().show();
	}

	hideWindow() {
		this.getRoot().hide();
	}
}
