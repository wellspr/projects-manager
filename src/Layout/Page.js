import Footer from "./Footer";
import Header from "./Header";
import Main from "./Main";

const Page = ({ children }) => {
    return <div className="app">
        <Header />
        <Main>{children}</Main>
        <Footer />
    </div>;
};

export default Page;