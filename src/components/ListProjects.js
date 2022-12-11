import { AiFillGithub } from "react-icons/ai";
import { MdWeb } from "react-icons/md";
import { useNavigate, useOutletContext } from "react-router-dom";
import Button from "./Button";
import Search from "./Search";

const ListProjects = ({ projects }) => {

    // Get data from session
    const session = useOutletContext();

    const navigate = useNavigate();

    const renderTags = (tags) => {
        return tags && Object.values(tags).map((tag, index) => {
            return <span 
                key={`${index}-${tag.key}`} 
                className="list__item__tagsList__item"
                >
                {tag.name}
            </span>
        });
    };

    const editAction = project => {
        navigate(`/edit/${project.key}`);
    };

    const addAction = () => {
        navigate("/create");
    }

    const renderEditButton = (project) => {

        if (!session) return null;

        return (
            <div className="list__item__wrapper">
                <Button 
                    onClick={() => editAction(project)}
                    type="action"
                    >
                    { "Edit" }
                </Button>
            </div>
        );
    };

    const AddProjectButton = ({ children }) => {
        if (!session) return null;

        return <>{ children }</>
    }

    const renderProjectsList = projects.map(project => {
        return <li key={project.key} className="list__item">
            <div className="list__item__wrapper">
                <h3 className="list__item__title">{ project.title }</h3>
                <p className="list__item__desc">{ project.description }</p>
                <div className="list__item__linkList">
                    <a 
                        className="list__item__link" 
                        href={project.githubLink}
                        target="_blank"
                        rel="noreferrer"
                        >
                        <span className="list__item__link__label">Github</span>
                        <AiFillGithub />
                    </a>
                    <a 
                        className="list__item__link" 
                        href={project.liveSite}
                        target="_blank"
                        rel="noreferrer"
                        >
                        <span className="list__item__link__label">Live</span>
                        <MdWeb />
                    </a>
                </div>
                <div className="list__item__tagsList">{ renderTags(project.tags) }</div>
            </div>

            { renderEditButton(project) }
        </li>
    });

    return <div className="component-wrapper">
        <div className="component__header">
            <h2 className="component__header__title">Recent Projects</h2>
            <Search />
            <AddProjectButton>
                <Button type="action" className="menu__btn" onClick={addAction}>
                    { "Add New Project" }
                </Button>
            </AddProjectButton>
        </div>
    
        <ul className="list">
            { renderProjectsList }            
        </ul>

        <div className="controls">
            <AddProjectButton>
                <Button type="action" size="large" onClick={addAction}>
                    { "Add New Project" }
                </Button>
            </AddProjectButton>
        </div>
    </div>;
};

export default ListProjects;
