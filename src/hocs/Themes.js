// React
import { useState } from "react";

// React Router Dom
import { Outlet, useOutletContext } from "react-router-dom";


const Themes = () => {

	const session = useOutletContext();

	const [theme, setTheme] = useState("dark");

	return <Outlet context={{ session, theme, setTheme }}/>
};

export default Themes;
