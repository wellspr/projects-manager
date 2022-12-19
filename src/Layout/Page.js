// React Router Dom
import { Outlet, useOutletContext } from "react-router-dom";

// Components
import Footer from "./Footer";
import Header from "./Header";
import Main from "./Main";


const Page = () => {

    const { theme } = useOutletContext();

    return <div className={`app app--theme app--theme__${theme}`}>
        <Header />
        <Main>
            <Outlet context={ useOutletContext() }/>
        </Main>
        <Footer />
    </div>;
};

export default Page;