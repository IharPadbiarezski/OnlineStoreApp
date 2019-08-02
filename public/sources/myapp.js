import {JetApp, EmptyRouter, HashRouter, plugins} from "webix-jet";
import "./styles/app.css";
import session from "./models/session";
import Cookies from "./views/cookies/cookies";

export default class MyApp extends JetApp {
	constructor(config) {
		const defaults = {
			id: APPNAME,
			version: VERSION,
			router: BUILD_AS_MODULE ? EmptyRouter : HashRouter,
			debug: !PRODUCTION,
			start: "/top",
			access: "customers"
		};

		super({...defaults, ...config});

		this.use(plugins.User, {model: session});
	}
}

if (!BUILD_AS_MODULE) {
	webix.ready(() => {
		let app = new MyApp();
		let promise = new Promise((resolve) => {
			resolve(Cookies.readCookie("userName"));
		});
		promise
			.then((result) => {
				if (result === "admin") {
					app.config.access = "admin";
				}
				app.render();
			});
		app.attachEvent("app:error:resolve", () => {
			webix.delay(() => app.show("/top/login"));
		});
	});


}
