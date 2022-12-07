import Button from "./Button";

const Menu = () => {
    
    const loginButtonText = () => {
        return "Login";
    };

    return (
        <div className="menu">
            <Button type="login" className="menu__btn">
                { loginButtonText() }
            </Button>
        </div>
    );
};

export default Menu;
