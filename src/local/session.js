import LocalDB from "./storage";
const session = new LocalDB({key: "session", type: "session"});

export const localSession = {
	getData: () => session.getData(),
	setData: (data) => session.setData(data),
	removeData: () => session.removeData(),
};
