// React Router Dom
import { useNavigate } from "react-router-dom";

import Button from "./Button";
import Project from "./Project";


const List = ({ projects, theme }) => {

    const renderProjectsList = projects.length
    ?
    projects.map(project => {
        return <li key={project.key} className={`list__item list__item--theme__${theme}`}>
            <div className="list__item__wrapper list__item__wrapper__grow">                
                <Project project={project} theme={theme} />
            </div>
            <div className="list__item__wrapper">
                <EditProjectButton project={project} theme={theme} />
            </div>
        </li>
    })
    :
    <EmptyList />;

    return <ul className="list">
		{ renderProjectsList }
	</ul>;
};


const EditProjectButton = ({ project, theme }) => {
    const navigate = useNavigate();
    
    return <Button 
		type="action"
        theme={theme}
        onClick={() => navigate(`/projects/edit/${project.key}`)}
        >
        { "Edit" }
    </Button>;
};

const EmptyList = () => {
    return <div className="list__empty">
        <h2 className="heading_2">There are no projects yet!</h2>
    </div>;
};

export default List;