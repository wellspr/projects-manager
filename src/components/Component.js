const Component = ({ children }) => {

	return <div className="component-wrapper">
		{ children }		
	</div>;
};

const Header = ({ theme, title, children }) => {

	return <div className={`component__header component__header--theme__${theme}`}>
		<h2 className="component__header__title">{ title }</h2>
		{ children }
	</div>
};

export { Component, Header };
