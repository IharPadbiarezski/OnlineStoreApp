import {JetView} from "webix-jet";
import {phones} from "../models/phones";
import {phoneModels} from "../models/phoneModels";

export default class LoginForm extends JetView {
	config() {
		const form = {
			view: "form",
			localId: "form",
			margin: 10,
			cols: [
				{
					margin: 10,
					rows: [
						{
							view: "text",
							name: "name",
							label: "Name",
							placeholder: "Type name",
							invalidMessage: "Name is required",
							required: true
						},
						{
							view: "text",
							name: "price",
							label: "Price",
							placeholder: "Type price",
							invalidMessage: "Price is required",
							required: true
						},
						{
							view: "forminput",
							name: "image",
							label: "Picture",
							body: {
								view: "uploader",
								value: "Add picture",
								accept: "image/jpeg, image/png",
								autosend: false,
								multiple: false,
								css: "uploader__button",
								on: {
									onBeforeFileAdd: (upload) => {
										let file = upload.file;
										let reader = new FileReader();
										reader.onload = (event) => {
											const phonePicture = event.target.result;
											this.$$("picture").setValues({picture: phonePicture});
										};
										reader.readAsDataURL(file);
										return false;
									}
								}
							}
						},
						{
							view: "template",
							name: "phonePicture",
							localId: "picture",
							css: "product__template",
							height: 160,
							template: (obj) => {
								let html;
								if (obj.picture) {
									html = `
									<img class="product__picture" src="${obj.picture}" width=150 alt="Phone picture" />
								`;
								}
								else {
									html = "<p>Don't forget to upload a picture :)</p>";
								}
								return html;
							}
						},
						{
							view: "button",
							value: "Add new product",
							hotkey: "enter",
							css: "add-product__button",
							width: 400,
							aling: "left",
							click: () => {
								if (this.getRoot().validate()) {
									const values = this.getRoot().getValues();
									this.createProduct(values);
									this.getRoot().clear();
									this.$$("picture").setValues({picture: ""});
									this.addModel(values);
								}
							}
						},
						{}
					]
				},
				{}
			],
			elementsConfig: {
				labelWidth: 150
			},
			rules: {
				name: webix.rules.isNotEmpty,
				price: webix.rules.isNumber
			}
		};

		return form;
	}

	createProduct(values) {
		values.amount = 0;
		values.rating = 0;
		values.image = this.$$("picture").getValues().picture;
		phones.add(values);
	}

	addModel(value) {
		if (value.name) {
			const modelName = value.name.split(" ")[0];
			const model = {value: modelName};
			phoneModels.add(model);
		}
	}
}
