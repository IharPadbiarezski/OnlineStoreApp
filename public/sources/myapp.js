import {JetApp, EmptyRouter, HashRouter, plugins} from "webix-jet";
import "./styles/app.css";
import session from "./models/session";

export default class MyApp extends JetApp {
	constructor(config) {
		const defaults = {
			id: APPNAME,
			version: VERSION,
			router: BUILD_AS_MODULE ? EmptyRouter : HashRouter,
			debug: !PRODUCTION,
			start: "/top/store"
		};

		super({...defaults, ...config});

		// this.use(plugins.User, {model: session});
	}
}

if (!BUILD_AS_MODULE) {
	webix.ready(() => {
		let app = new MyApp();
		app.render();
		app.attachEvent("app:error:resolve", () => {
			webix.delay(() => app.show("/top/store"));
		});
		// app.use(plugins.User, {
		// 	model: session,
		// 	// login: "/login", default /login
		// 	// logout: "/logout", default
		// 	afterLogin: "/store",
		// 	// afterLogout: "/login" default
		// 	// ping: 15000,
		// 	// afterLogin: "someStartPage",
		// 	user: { /* ... */ }
		// });
	});
}
