// React Router Dom
import { useLoaderData, useNavigate } from "react-router-dom";

// Components
import Button from "../components/Button";
import Search from "../components/Search";
import List from "../components/List";
import Controls from "../components/Controls";


const Projects = () => {

    const projects = useLoaderData();
    const path = "/projects/create";

    return <div className="component-wrapper">
        <div className="component__header">
            <h2 className="component__header__title">Recent Projects</h2>
            <Search />
            <AddProjectButton path={path}/>
        </div>
    
        <List projects={projects} />

        <Controls>
            <AddProjectButton 
                size="large" 
                path={path}
            />
        </Controls>
    </div>;
};


const AddProjectButton = ({ size, path }) => {
    const navigate = useNavigate();

    return <Button 
        type="action" 
        size={size} 
        onClick={() => navigate(path)}
        >
        { "Add New Project" }
    </Button>
};

export default Projects;
