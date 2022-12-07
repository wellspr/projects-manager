import { AiFillGithub } from "react-icons/ai";
import { MdWeb } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import Search from "./Search";

const ListProjects = ({ projects }) => {

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

            <div className="list__item__wrapper">
                <Button 
                    onClick={() => navigate(`/edit/${project.key}`)}
                    type="action"
                    >
                    { "Edit" }
                </Button>
            </div>
        </li>
    });

    return <div className="component-wrapper">
        <div className="component__header">
            <h2 className="component__header__title">Recent Projects</h2>
            <Search />
            <Button type="action" className="menu__btn" onClick={() => navigate("/create")}>
                { "Add New Project" }
            </Button>
        </div>
    
        <ul className="list">
            { renderProjectsList }            
        </ul>

        <div className="controls">
            <Button type="action" size="large" onClick={() => navigate("/create")}>
                { "Add New Project" }
            </Button>
        </div>
    </div>;
};

export default ListProjects;
