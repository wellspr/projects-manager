import { useLoaderData } from "react-router-dom";
import ListProjects from "../components/ListProjects";
import Page from "../Layout/Page";

const Home = () => {

    const projects = useLoaderData();

    return <Page>
        <ListProjects projects={projects} />
    </Page>;
};

export default Home;