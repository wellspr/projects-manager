// React
import { useEffect, useState } from "react";

// React Router Dom
import { 
	Outlet, 
	useLoaderData, 
	useOutletContext, 
} from "react-router-dom";

// API
import { settings as settingsApi } from "../api";

// Local Data
import { local } from "../local";



const Themes = () => {

	const session = useOutletContext();
	
	const loadedSettings = useLoaderData();

	const [settings] = useState(loadedSettings);
	
	const [theme, setTheme] = useState(settings.theme || "light");

	useEffect(() => {
		if (Object.values(settings).length === 0) {
			console.log("Adding database...");
			settingsApi.set({
				userId: session.userId,
				theme
			});
		}
	}, [settings, theme, session]);

	const updateTheme = theme => {
		const { key } = settings;
		settingsApi.update({ theme }, key);
		local.settings.updateData("theme", theme);
	};

	return <Outlet context={{ 
		session, 
		theme, 
		setTheme,
		updateTheme
	}}/>
};

export default Themes;
