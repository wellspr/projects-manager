import { useLoaderData } from "react-router-dom";
import EditProject from "../components/EditProject";
import Page from "../Layout/Page";

const Edit = () => {

    const project = useLoaderData();

    return <Page>
        <EditProject project={project} />
    </Page>;
};

export default Edit;