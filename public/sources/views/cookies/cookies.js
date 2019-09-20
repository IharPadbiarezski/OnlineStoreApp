export default class Cookies {
	static createCookie(key, value, date) {
		let expiration = new Date(date).toUTCString();
		let cookie = `${escape(key)}=${escape(value)};expires=${expiration};`;
		document.cookie = cookie;
	}

	static readCookie(name) {
		let key = `${name}=`;
		let cookies = document.cookie.split(";");
		for (let i = 0; i < cookies.length; i++) {
			let cookie = cookies[i];
			while (cookie.charAt(0) === " ") {
				cookie = cookie.substring(1, cookie.length);
			}
			if (cookie.indexOf(key) === 0) {
				return cookie.substring(key.length, cookie.length);
			}
		}
		return null;
	}

	static deleteCookie(name) {
		this.createCookie(name, "", -1);
	}
}
