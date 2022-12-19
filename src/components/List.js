import { useNavigate } from "react-router-dom";

import { AiFillGithub } from "react-icons/ai";
import { MdWeb } from "react-icons/md";

import Button from "./Button";
import Tags from "./Tags";


const List = ({ projects, theme }) => {

    const renderProjectsList = projects.length
    ?
    projects.map(project => {

        const d = project.dateAdded && new Date(project.dateAdded);

        return <li key={project.key} className={`list__item list__item--theme__${theme}`}>
            <div className="list__item__wrapper list__item__wrapper__grow">
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

                { d && <p>Added: { d.toLocaleDateString() }</p> }

                <Tags tags={project.tags} theme={theme} />
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