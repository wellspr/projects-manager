// React Router Dom
import { 
    useLoaderData, 
    useNavigate, 
    useOutletContext 
} from "react-router-dom";

// React
import { useEffect, useState } from "react";

// Components
import { Component, Header } from "../components/Component";
import Search from "../components/Search";
import List from "../components/List";
import Button from "../components/Button";
import Controls from "../components/Controls";


const Projects = () => {
    const { theme } = useOutletContext();
    const projects = useLoaderData();
    
    const path = "/projects/create";
    
    const [searchTerm, setSearchTerm] = useState("");
    const [olderFirst, setOlderFirst] = useState(false);
    const [filteredProjects, setFilteredProjects] = useState(projects);

    useEffect(() => {
        setFilteredProjects(
            projects
                .filter(project => {
                    const tags = Object.values(project.tags).reduce((total, tag) => {
                        return total + " " + tag.name;
                    }, "");

                    return String(project.title + project.description + tags)
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase());
                })
                .sort((a, b) => { 
                    return olderFirst 
                        ? a.dateAdded - b.dateAdded 
                        : b.dateAdded - a.dateAdded 
                })
        );
    }, [projects, searchTerm, olderFirst]);

    return <Component>
        <Header theme={theme} title="Projects">
            <Search 
                searchTerm={searchTerm} 
                setSearchTerm={setSearchTerm}    
            />

            <AddProjectButton path={path} theme={theme} />

            <div className="projects__header__search-config-area">
                <Button 
                    className="projects__header__search-config-area__button"
                    theme={theme} 
                    onClick={() => setOlderFirst(!olderFirst)}>
                        { olderFirst ? "Newer First" : "Older First"}
                </Button>

                <div className="projects__header__search-config-area__results">
                    <p>{filteredProjects.length} projects found</p>
                </div>
            </div>
        </Header>
    
        <List 
            projects={filteredProjects} 
            theme={theme} 
        />

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
