// React Router Dom
import { useLoaderData, useNavigate } from "react-router-dom";

// React
import { useEffect, useState } from "react";

// Components
import AlertBox from "../components/AlertBox";
import Button from "../components/Button";
import Form from "../components/Form";

// API
import { projects } from "../api";
import Controls from "../components/Controls";
import DangerZone from "../components/DangerZone";


const EditProject = () => {

    const navigate = useNavigate();
    const project = useLoaderData();

    if (!project) {
        throw new Error("Project not found");
    }

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [tags, setTags] = useState({});
    const [techstack, setTechstack] = useState([]);
    const [githubLink, setGithubLink] = useState("");
    const [liveSite, setLiveSite] = useState("");
    const [thumbnails, setThumbnails] = useState([]);
    const [completed, setCompleted] = useState(false);

    const [showAlert, setShowAlert] = useState(false);

    useEffect(() => {
        setTitle(project.title || "");
        setDescription(project.description || "");
        setTags(project.tags || []);
        setTechstack(project.techstack || []);
        setGithubLink(project.githubLink || "");
        setLiveSite(project.liveSite || "");
        setThumbnails(project.thumbnails || []);
        setCompleted(project.completed);
    }, [project]);

    const onSaveChanges = () => {
        projects.updateProject({
            title,
            description,
            tags,
            techstack,
            githubLink,
            liveSite,
            thumbnails,
            completed,
            dateModified: Date.now(),
        }, project.key)
            .then(() => navigate("/projects"))
            .catch(err => console.log(err));
    }

    return <div className="component-wrapper">
        <div className="component__header">
            <h2 className="component__header__title">Edit Project</h2>
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
            onSubmit={onSaveChanges} onSubmitLabel="Save Changes"
        />

        <Controls>
            <Button 
                type="action" 
                size="large"
                onClick={onSaveChanges}
                className="control__btn"
                >
                { "Save Changes" }
            </Button>
            <Button 
                type="action"
                size="large"
                className="control__btn"
                onClick={() => navigate("/projects")}
                >
                { "Cancel" }
            </Button>
        </Controls>

        <DangerZone 
            actionLabel="Delete Project"
            message="This will remove this project definitively."
            setShowAlert={setShowAlert}
        />

        <AlertBox 
            show={showAlert}
            setShow={setShowAlert}
            >
            <div className="alert">
                <h3 className="alert__header">Delete Project</h3>

                <h4 className="alert__message">This action will permanently remove project { project.title }. </h4>

                <Button 
                    type={"danger"}
                    className="alert__btn"
                    onClick={() => {
                        projects.deleteProject(project.key)
                        .then(r => navigate("/projects"))
                        .catch(err => console.log(err));
                    }}
                    >
                    { "Confirm" }
                </Button>

                <Button
                    type={"action"}
                    className="alert__btn"
                    onClick={() => setShowAlert(!showAlert)}
                    >
                    { "Cancel" }
                </Button>
            </div>

        </AlertBox>
    </div>;
};

export default EditProject;
