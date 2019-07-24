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

	static getTotalAmount() {
		let totalAmount = 0;
		const phonesFromLS = Storage.getPhonesFromStorage();
		phonesFromLS.forEach((phone) => {
			totalAmount += phone.counter;
		});
		return totalAmount;
	}
}
