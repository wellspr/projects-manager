import { useOutletContext, useRevalidator } from "react-router-dom";
import { githubAuth, users } from "../api";
import Button from "./Button";
import { HiOutlineUserCircle } from "react-icons/hi";

const Menu = () => {

    const user = useOutletContext();

    const revalidator = useRevalidator();

    console.log("USER: ", user);

    const DefaultIcon = () => {
        return <div className="menu__icon">
            <HiOutlineUserCircle size={30} />
        </div>
    };

    const Avatar = () => {
        return <img 
            className="menu__img" 
            src={user.avatarUrl} 
            alt="Avatar" 
            height="30px" 
            width="30px"
        />;
    };
    
    const loginButtonText = () => {
        if (user) {
            if (user.avatarUrl) {
                return <Avatar />;
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

    const githubLogin = () => {
        githubAuth.githubLogin()
        .then(r => window.location.assign(r.data))
        .catch(err => console.log(err));
    };

    const logout = () => {
        users.logout().then(() => revalidator.revalidate());
    };

    return (
        <div className="menu">
            { username() }
            <Button 
                type="login" 
                onClick={() => {
                    if (!user) {
                        githubLogin();
                    } else {
                        logout();
                    }
                }}
                >
                { loginButtonText() }
            </Button>            
        </div>
    );
};

export default Menu;
