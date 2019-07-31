import {urls} from "../config/urls";

let status = () => webix.ajax().post(urls.status)
	.then(a => a.json());

let login = (email, password) => webix.ajax().post(urls.login, {
	email, password
}).then(a => a.json());

let logout = () => webix.ajax().post(urls.logout)
	.then(a => a.json());

let register = (user, pass, confpass, name) => webix.ajax().post(urls.register, {
	user, pass, confpass, name
}).then(a => a.json());

export default {
	status, login, logout, register
};

