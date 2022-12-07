import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { projects } from "../api";
import Button from "./Button";
import Form from "./Form";

const CreateProject = () => {

    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [tags, setTags] = useState({});
    const [techstack, setTechstack] = useState([]);
    const [githubLink, setGithubLink] = useState("");
    const [liveSite, setLiveSite] = useState("");
    const [thumbnails, setThumbnails] = useState("");
    const [completed, setCompleted] = useState(false);

    const onAddProject = () => {
        const d = new Date();
        projects.addProject({
            title,
            description,
            tags,
            techstack,
            githubLink,
            liveSite,
            thumbnails,
            completed,
            dateAded: d.getTime()
        })
        .then(() => navigate("/"))
        .catch(err => console.log(err));
    };

    return <div className="component-wrapper">
        <div className="component__header">
            <h2 className="component__header__title">Create a new Project</h2>
        </div>
        <Form 
            title={title} setTitle={setTitle}
            description={description} setDescription={setDescription}
            tags={tags} setTags={setTags}
            techstack={techstack} setTechstack={setTechstack}
            githubLink={githubLink} setGithubLink={setGithubLink}
            liveSite={liveSite} setLiveSite={setLiveSite}
            thumbnails={thumbnails} setThumbnails={setThumbnails}
            completed={completed} setCompleted={setCompleted}
            onSubmit={onAddProject} onSubmitLabel="Add Project"
        />
        <div className="controls">
            <Button 
                type="action" 
                size="large"
                className="control__btn"
                onClick={onAddProject}
                disabled={!title.length?true:false}
                >
                { "Add Project" }
            </Button>
            <Button 
                type="action"
                size="large"
                className="control__btn"
                onClick={() => navigate("/")}
                >
                { "Cancel" }
            </Button>
        </div>
    </div>;
};

export default CreateProject;
