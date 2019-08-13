import {JetView} from "webix-jet";

export default class DeclineReasonsWindow extends JetView {
	get templateId() {
		return "template";
	}

	config() {
		const toolbar = {
			view: "toolbar",
			height: 56,
			css: "toolbar__bg",
			elements: [
				{
					view: "label",
					label: "Decline Reasons",
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

		const template = {
			localId: this.templateId,
			css: "decline-reason__template",
			template: obj => obj.Reason
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
					template
				]
			}
		};
	}

	showWindow(values) {
		this.$$(`${this.templateId}`).setValues(values);
		this.getRoot().show();
	}

	hideWindow() {
		this.getRoot().hide();
	}
}
