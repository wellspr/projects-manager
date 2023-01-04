// React Router Dom
import { NavLink, useOutletContext } from "react-router-dom";

// Icons
import { HiOutlineUserCircle } from "react-icons/hi";
import { TiSocialGithub } from "react-icons/ti";
import { MdDarkMode, MdLightMode } from "react-icons/md";

// API
import { users } from "../api";

// Components
import Avatar from "./Avatar";
import DropdownButton from "./DropdownButton";
import Button from "./Button";

// Local Data Storage
import { local } from "../local";


const DefaultIcon = () => {
    return <div className="menu__icon">
        <HiOutlineUserCircle size={30} />
    </div>
};

const NavButtons = () => {
    return <div className="menu__nav">
        <NavLink to={"/"} className="menu__nav__navlink">Home</NavLink>
        <NavLink to={"/projects"} className="menu__nav__navlink">Projects</NavLink>
    </div>;
};

const Menu = () => {
    
    const { session, theme, setTheme, updateTheme } = useOutletContext();

    const buttonContent = () => {
        if (session) {
            if (session.avatarUrl) {
                return <Avatar 
                    className="menu__img"
                    size={30}
                    src={session.avatarUrl}
                    defaultElement={<DefaultIcon />}
                />;
            }
            return <DefaultIcon />;
        }
        return "Login";
    };

    const username = () => {
        if (session) {
            return <div className="menu__username">
                { session.githubLogin }
                <TiSocialGithub size={24}/>
            </div>;
        }
    };

    const dropdownContent = () => {
        return <>
            { username() }
            <Button type="dropdown-item" theme={theme}>
                <NavLink to="settings">Settings</NavLink>
            </Button>
            <Button type="dropdown-item" theme={theme} onClick={() => { logout() }}>
                { "Logout" }
            </Button>
        </>;
    };

    const logout = () => {
        users.logout()
            .then(() => local.session.clearData())
            .catch(err => console.log(err))
            .finally(() => window.location.reload());
    };

    const handleTheme = () => {
        setTheme(theme==="light"?"dark":"light")
        updateTheme(theme==="light"?"dark":"light");
    };

    return <div className="menu-wrapper">
        <div className="menu">

            <Button 
                onClick={handleTheme} 
                theme={theme}
                >
                {
                    theme === "light"?
                    <MdDarkMode size={20} />:
                    <MdLightMode size={20} />
                }
            </Button>
            
            <NavButtons />
            <DropdownButton 
                buttonContent={buttonContent}
                dropdownContent={dropdownContent}
            />
        </div>
    </div>;
};

export default Menu;
