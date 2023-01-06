import { useOutletContext } from "react-router-dom";
import Brand from "../components/Brand";
import Menu from "../components/Menu";

const Header = () => {

    const { theme } = useOutletContext() || {};

    return <header className={`header header--theme header--theme__${theme}`}>
        <Brand />
        <Menu />        
    </header>;
};

export default Header;