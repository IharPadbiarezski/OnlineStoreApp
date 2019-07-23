export default class Storage {
	static saveIntoStorage(phone) {
		let phones = this.getPhonesFromStorage();
		phones.push(phone);
		localStorage.setItem("phones", JSON.stringify(phones));
	}

	static getPhonesFromStorage() {
		let phones;
		if (localStorage.getItem("phones") === null) {
			phones = [];
		}
		else {
			phones = JSON.parse(localStorage.getItem("phones"));
		}
		return phones;
	}

	static removePhoneLocalStorage(id) {
		let phonesLS = this.getPhonesFromStorage();
		phonesLS.forEach((phoneLS, index) => {
			if (phoneLS.id === id) {
				phonesLS.splice(index, 1);
			}
		});
		localStorage.setItem("phones", JSON.stringify(phonesLS));
	}

	static clearLocalStorage() {
		localStorage.clear();
	}

	static getFromLocalStorage() {
		let phonesLS = this.getPhonesFromStorage();

		phonesLS.forEach((phone) => {
            console.log(phone)
		});
	}
}
