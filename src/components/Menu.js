// React Router Dom
import { NavLink, useOutletContext, useRevalidator } from "react-router-dom";

// Icons
import { HiOutlineUserCircle } from "react-icons/hi";

// API
import { githubAuth, users } from "../api";

// Components
import Button from "./Button";
import Avatar from "./Avatar";
import { useState } from "react";


const Menu = () => {

    const user = useOutletContext();

    const revalidator = useRevalidator();

    const [showDropdown, setShowDropdown] = useState(false);

    const DefaultIcon = () => {
        return <div className="menu__icon">
            <HiOutlineUserCircle size={30} />
        </div>
    };
    
    const loginButtonContent = () => {
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

    const navButtons = () => {
        return <div className="menu__nav">
            <NavLink to={"/"} className="menu__nav__navlink">Home</NavLink>
            <NavLink to={"/projects"} className="menu__nav__navlink">Projects</NavLink>
        </div>;
    };

    const githubLogin = (window) => {
        githubAuth.githubLogin()
        .then(r => window.location.assign(r.data))
        .catch(err => console.log(err));
    };

    const logout = () => {
        users.logout().then(() => revalidator.revalidate());
    };

    const Dropdown = () => {};

    return <div className="menu">
        { navButtons() }
        { //username() 
        }
        <Button 
            type="login" 
            onClick={() => {
                if (!user) {
                    githubLogin(window);
                } else {
                    logout();
                }
            }}
            >
            { loginButtonContent() }
        </Button>            
    </div>;
};

export default Menu;
