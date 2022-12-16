// React Router Dom
import { NavLink, useOutletContext, useRevalidator } from "react-router-dom";

// Icons
import { HiOutlineUserCircle } from "react-icons/hi";

// API
import { users } from "../api";

// Components
import Avatar from "./Avatar";
import DropdownButton from "./DropdownButton";
import Button from "./Button";


const Menu = () => {

    const user = useOutletContext();

    const revalidator = useRevalidator();

    const DefaultIcon = () => {
        return <div className="menu__icon">
            <HiOutlineUserCircle size={30} />
        </div>
    };

    const buttonContent = () => {
        if (user) {
            if (user.avatarUrl) {
                return <Avatar 
                    className="menu__img"
                    size={30}
                    src={user.avatarUrl}
                    defaultElement={<DefaultIcon />}
                />;
            }
            return <DefaultIcon />;
        }
        return "Login";
    };

    const username = () => {
        if (user) {
            return <div className="menu__username">
                { user.githubLogin }
            </div>;
        }
    };

    const dropdownContent = () => {
        return <>
            { username() }
            <Button type="dropdown-item">
                <NavLink to="settings">Settings</NavLink>
            </Button>
            <Button type="dropdown-item" onClick={() => logout()}>
                { "Logout" }
            </Button>
        </>;
    }

    const logout = () => {
        users.logout().then(() => revalidator.revalidate());
    };

    const NavButtons = () => {
        return <div className="menu__nav">
            <NavLink to={"/"} className="menu__nav__navlink">Home</NavLink>
            <NavLink to={"/projects"} className="menu__nav__navlink">Projects</NavLink>
        </div>;
    };

    return <div className="menu-wrapper">
        <div className="menu">
            <NavButtons />
            <DropdownButton 
                buttonContent={buttonContent}
                dropdownContent={dropdownContent}
            />
        </div>
    </div>;
};

export default Menu;
