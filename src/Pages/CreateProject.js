// React
import { useState } from "react";

// React Router Dom
import { useNavigate, useOutletContext } from "react-router-dom";

// Components
import Button from "../components/Button";
import Form from "../components/Form";

// API
import { projects } from "../api";
import Controls from "../components/Controls";
import { Component, Header } from "../components/Component";


const CreateProject = () => {

    const navigate = useNavigate();
    const { session, theme } = useOutletContext();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [tags, setTags] = useState({});
    const [techstack, setTechstack] = useState([]);
    const [githubLink, setGithubLink] = useState("");
    const [liveSite, setLiveSite] = useState("");
    const [thumbnails, setThumbnails] = useState([]);
    const [completed, setCompleted] = useState(false);

    const onAddProject = () => {
        projects.addProject({
            title,
            description,
            tags,
            techstack,
            githubLink,
            liveSite,
            thumbnails,
            completed,
            dateAdded: Date.now(),
            dateModified: null,
            userId: session.userId,
        })
        .then(() => navigate("/projects"))
        .catch(err => console.log(err));
    };

    return <Component>
        <Header title="Create a new Project" theme={theme}/>
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
        <Controls>
            <Button 
                type="action" 
                size="large"
                theme={theme}
                className="control__btn"
                disabled={!title.length?true:false}
                onClick={onAddProject}
                >
                { "Add Project" }
            </Button>
            <Button 
                type="action"
                size="large"
                theme={theme}
                className="control__btn"
                onClick={() => navigate("/projects")}
                >
                { "Cancel" }
            </Button>
        </Controls>
    </Component>;
};

export default CreateProject;
