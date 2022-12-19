// React Router Dom
import { useLoaderData, useNavigate, useOutletContext } from "react-router-dom";

// Components
import Button from "../components/Button";
import Search from "../components/Search";
import List from "../components/List";
import Controls from "../components/Controls";
import { Component, Header } from "../components/Component";


const Projects = () => {

    const projects = useLoaderData();
    const { theme } = useOutletContext();
    const path = "/projects/create";

    return <Component>
        <Header theme={theme} title="Projects">
            <Search />
            <AddProjectButton path={path} theme={theme} />
        </Header>
    
        <List projects={projects} theme={theme} />

        <Controls>
            <AddProjectButton 
                size="large" 
                path={path}
                theme={theme}
            />
        </Controls>
    </Component>;
};


const AddProjectButton = ({ size, path, theme }) => {
    const navigate = useNavigate();

    return <Button 
        type="action" 
        size={size} 
        theme={theme}
        onClick={() => navigate(path)}
        >
        { "Add New Project" }
    </Button>
};

export default Projects;
