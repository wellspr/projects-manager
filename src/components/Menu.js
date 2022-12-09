import { auth } from "../api";
import Button from "./Button";

const Menu = () => {
    
    const loginButtonText = () => {
        return "Login";
    };

    return (
        <div className="menu">
            <Button 
                type="login" 
                className="menu__btn"
                onClick={() => {
                    auth.githubLogin()
                        .then(r => window.location.assign(r.data))
                        .catch(err => console.log(err));
                }}
                >
                { loginButtonText() }
            </Button>
        </div>
    );
};

export default Menu;
