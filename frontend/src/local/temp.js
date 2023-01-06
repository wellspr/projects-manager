import LocalDB from "./storage";

const setData = (id, data) => {
	const temp_db = new LocalDB({key: id});
	temp_db.setData(data);
};

const getData = (id) => {
	const temp_db = new LocalDB({key: id});
	return temp_db.getData();
};

const removeData = (id) => {
	const temp_db = new LocalDB({key: id});
	temp_db.removeData();
};

export const temp = {
	getData,
	setData,
	removeData,
};
