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
			start: "/top",
			access: "customers"
		};

		super({...defaults, ...config});

		this.use(plugins.User, {
			model: session,
			public: path => path.indexOf("/login/signin") > -1 || path.indexOf("/login/register") > -1 || path.indexOf("/login/reset") > -1
		});
	}
}

if (!BUILD_AS_MODULE) {
	webix.ready(() => {
		let app = new MyApp();
		app.render();
		app.attachEvent("app:error:resolve", () => {
			webix.delay(() => app.show("/top/login"));
		});
	});
}
