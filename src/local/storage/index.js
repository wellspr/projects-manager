const storage = (storage) => {

	return {
		setData: ({ key, value }) => {
			if (typeof(value) !== "string") {
				value = JSON.stringify(value);
			}
			storage.setItem(key, value);
		},

		getData: (key) => {
			const data = storage.getItem(key);
			//console.log("Stringfied data: ", data, "\ntype: ", typeof(data));

			try {
				const parsedData = JSON.parse(data);
				
				if (parsedData) {
					//console.log("Returning parsed data")
					return JSON.parse(data);
				}
			} catch (err) {
				// do nothing
				//console.log("Parsing error, 'storage.js'", err);
			}
			
			//console.log("Returning data...", )
			return data;
		},

		removeData: (key) => {
			storage.removeItem(key);
		},

		clearData: () => {
			storage.clear();
		},
	};
};

const sessionData = storage(window.sessionStorage);
const localData = storage(window.localStorage);

class LocalDB {

	constructor({key, type}) {
		this.key = key;
		this.type = type;
	}

	setData (data) {
		if (this.type === "session") {
			sessionData.setData({ key: this.key, value: data });
		} else {
			localData.setData({ key: this.key, value: data });
		}
	}

	getData () {
		if (this.type === "session") {
			return sessionData.getData(this.key);
		}
		return localData.getData(this.key);
	}

	removeData () {
		if (this.type === "session") {
			sessionData.removeData(this.key);
		} else {
			localData.removeData(this.key);
		}
	}

}

export default LocalDB;