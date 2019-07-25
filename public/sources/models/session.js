let status = () => webix.ajax().post("http://localhost:3000/server/login/status")
	.then(a => a.json());

let login = (user, pass) => webix.ajax().post("http://localhost:3000/server/login", {
	user, pass
}).then(a => a.json());

let logout = () => webix.ajax().post("http://localhost:3000/server/logout")
	.then(a => a.json());

let register = (user, pass, confpass, name) => webix.ajax().post("http://localhost:3000/server/register", {
	user, pass, confpass, name
}).then(a => a.json());

export default {
	status, login, logout
};

