const storage = window.sessionStorage;


export const setData = ({ key, value }) => {
	if (typeof(value) !== "string") {
		value = JSON.stringify(value);
	}
	storage.setItem(key, value);
};

export const getData = (key) => {
	const data = storage.getItem(key);
	return JSON.parse(data);
};

export const removeData = (key) => {
	storage.removeItem(key);
};

export const clearData = () => {
	storage.clear();
};
