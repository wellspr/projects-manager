// React Router Dom
import { Outlet, useOutletContext } from "react-router-dom";

// Components
import Footer from "./Footer";
import Header from "./Header";
import Main from "./Main";


const Page = () => {

    const session = useOutletContext();
    
    return <div className="app">
        <Header />
        <Main>
            <Outlet context={session} />
        </Main>
        <Footer />
    </div>;
};

export default Page;