import { localSession } from "./session";
import { localSettings } from "./settings";
import { localProjects } from "./projects";
import { temp } from "./temp";


export const local = {
	session: localSession,
	settings: localSettings,
	projects: localProjects,
}

export { temp };