// React Router Dom
import { useOutletContext } from "react-router-dom";

// Components
import { Component, Header } from "../components/Component";
import Avatar from "../components/Avatar";

// Local Session
import { local } from "../local";


const Settings = () => {

	const { theme } = useOutletContext();

	const data = local.session.getData();

	console.table(data);

	return <Component>
		<Header title="Settings" theme={theme} />
		
		<h2>{ data.name }</h2>

		<div className="settings">

			<div className="settings__avatar">
				<Avatar 
					src={data.avatarUrl}
					size={200}
					className="avatar__base"
				/>
			</div>

			<div className="settings_items">
				<div className="settings__item">
					<h2>GitHub Login</h2> 
					<p>{data.githubLogin}</p>
				</div>

				<div className="settings__item">
					<h2>Email</h2> 
					<p>{data.email}</p>
				</div>

				<div className="settings__item">
					<h2>Github Url</h2> 
					<a href={data.gitHubUrl} target="_blank" rel="noreferrer">{data.gitHubUrl}</a>
				</div>
			</div>
		</div>

		<div className="settings__item">
			<h2>Theme</h2>
			<p>{ theme }</p>
		</div>
		
	</Component>;
};

export default Settings;
