import LocalDB from "./storage";
const projects = new LocalDB({ key: "projects" });

const get = (key) => {

	if (key) {
		const storedData = projects.getData();
		return storedData.filter(project => project.key === key)[0];
	}

	return projects.getData();
};

const set = (data) => projects.setData(data);

const add = (project) => {
	const storedProjects = projects.getData();

	if (storedProjects) {
		storedProjects.unshift(project);
		projects.setData(storedProjects);
	} else {
		projects.setData([ projects ]);
	}
};

const update = (key, updates) => {
	const storedProjects = projects.getData();

	const updatedStoredProjects = storedProjects.map(storedProject => {
		if (storedProject.key === key) {
			return { ...storedProject, ...updates };
		}
		return storedProject;
	});

	projects.setData(updatedStoredProjects);
};

const remove = (key) => {
	const storedProjects = projects.getData();

	if (storedProjects) {
		const updatedStoredProjects = storedProjects.filter(storedProject => {
			return storedProject.key !== key;
		});

		projects.setData(updatedStoredProjects);
	}
};


export const localProjects = {
	get,
	set,
	add,
	update,
	remove,
};
