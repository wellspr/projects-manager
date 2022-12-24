// React
import { useEffect, useMemo, useState } from "react";

// React Router Dom
import { 
	Outlet, 
	useLoaderData, 
	useOutletContext, 
} from "react-router-dom";

import { settings as settingsApi } from "../api";
import { getData, setData } from "../local/sessionStorage";


const Themes = () => {

	const session = useOutletContext();
	
	const loadedSettings = useLoaderData();
	
	const [settings] = useState(loadedSettings);

	const [theme, setTheme] = useState(settings.theme || "light");

	const key = useMemo(() => {
		const { key } = settings;
		return key;
	}, [settings]);

	useEffect(() => {
		if (key && (theme !== settings.theme)) {
			settingsApi.update({ theme }, key);

			const currentSettings = getData("settings");

			if (currentSettings) {
				currentSettings.theme = theme;
				setData({ key: "settings", value: currentSettings });
			}
		}
	}, [theme, key, settings]);

	useEffect(() => {
		if (Object.values(settings).length === 0) {
			console.log("Adding database...");
			settingsApi.set({
				userId: session.userId,
				theme
			});
		}
	}, [settings, theme, session]);

	return <Outlet context={{ session, theme, setTheme }}/>
};

export default Themes;
