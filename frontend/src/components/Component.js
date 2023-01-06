import { IoChevronBackOutline } from "react-icons/io5";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

const Component = ({ children }) => {
	return <div className="component-wrapper">
		{ children }		
	</div>;
};

const Header = ({ theme, title, children, backButton=undefined }) => {

	const navigate = useNavigate();

	return <div className={`component__header component__header--theme__${theme}`}>
		<div className="component__header__title-wrapper">
			{
				backButton &&
				<Button onClick={() => navigate(backButton.to)} theme={theme}>
					<IoChevronBackOutline size={20}/>
				</Button>
			}
			<h2 className="component__header__title">
				{ title }
			</h2>
		</div>
		{ children }
	</div>
};

export { Component, Header };
