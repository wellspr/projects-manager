import LocalDB from "./storage";
const settings = new LocalDB({key: "settings"});

const getData = (query) => {

	const savedSettings = settings.getData();

	if (query && savedSettings) {
		return savedSettings[query];
	}

	return savedSettings;
};

const setData = (data) => settings.setData(data);

const updateData = (id, update) => {

	const storedSettings = settings.getData();

	if (storedSettings) {
		storedSettings[id] = update;
		settings.setData(storedSettings);
	}
};

const removeData = () => settings.removeData();

export const localSettings = {
	getData,
	setData,
	updateData,
	removeData,
};
