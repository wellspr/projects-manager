import { useOutletContext } from "react-router-dom";
import { Component, Header } from "../components/Component";

const Settings = () => {

	const { theme } = useOutletContext();

	return <Component>
		<Header title="Settings" theme={theme} />

		
	</Component>;
};

export default Settings;
