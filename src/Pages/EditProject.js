// React
import { useEffect, useState } from "react";

// React Router Dom
import { 
    useLoaderData, 
    useLocation, 
    useNavigate, 
    useOutletContext 
} from "react-router-dom";

// Components
import { Component, Header } from "../components/Component";
import AlertBox from "../components/AlertBox";
import Button from "../components/Button";
import Form from "../components/Form";
import Controls from "../components/Controls";
import DangerZone from "../components/DangerZone";
import AuthRequiredBox from "../components/AuthRequiredBox";

// API
import { projects } from "../api";

// Local Data
import { local, temp } from "../local";


const EditProject = () => {

    const { theme } = useOutletContext();
    const project = useLoaderData();

    const navigate = useNavigate();
    const location = useLocation();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [tags, setTags] = useState({});
    const [techstack, setTechstack] = useState([]);
    const [githubLink, setGithubLink] = useState("");
    const [liveSite, setLiveSite] = useState("");
    const [thumbnails, setThumbnails] = useState([]);
    const [workInProgress, setWorkInProgress] = useState(false);
    const [published, setPublished] = useState(false);

    const [showAlert, setShowAlert] = useState(false);
    const [showAuthBox, setShowAuthBox] = useState(false);


    useEffect(() => {
        setTitle(project.title || "");
        setDescription(project.description || "");
        setTags(project.tags || []);
        setTechstack(project.techstack || []);
        setGithubLink(project.githubLink || "");
        setLiveSite(project.liveSite || "");
        setThumbnails(project.thumbnails || []);
        setWorkInProgress(project.workInProgress);
        setPublished(project.published);
    }, [project]);

    const onSaveChanges = () => {

        const updates = {
            title,
            description,
            tags,
            techstack,
            githubLink,
            liveSite,
            thumbnails,
            workInProgress,
            published,
            dateModified: Date.now(),
        };

        projects.updateProject(updates, project.key)
            .then(() => {
                /** Update projects local data */
                local.projects.update(project.key, updates);

                /** Navigate back to "/projects" */
                navigate("/projects"); 
            })
            .catch(err => {
                console.log("Could not save project details. ", err.message);
                
                /** Store updates to recover after authentication */
                temp.setData("update", updates);
                
                if (err.response.status === 401) {
                    /** Open alert box for authentication */
                    console.log("Authentication required");
                    temp.setData("navigationState", { nextUrl: location.pathname });
                    setShowAuthBox(true);
                }
            });
    };

    const onDeleteProject = () => {
        projects.deleteProject(project.key)
            .then(() => {
                /** Remove project from local */
                local.projects.remove(project.key);

                /** Navigate back */
                navigate("/projects");
            })
            .catch(err => {
                console.log("Could not delete project. ", err.message);
                                
                if (err.response.status === 401) {
                    /** Open alert box for authentication */
                    console.log("Authentication required");
                    temp.setData("navigationState", { nextUrl: location.pathname });
                    setShowAuthBox(true);
                }
            });
    };

    return <Component>
        <Header title="Edit Project" theme={theme} backButton={{ to: "/projects" }}>

        </Header>

        <Form 
            title={title} setTitle={setTitle}
            description={description} setDescription={setDescription}
            tags={tags} setTags={setTags}
            techstack={techstack} setTechstack={setTechstack}
            githubLink={githubLink} setGithubLink={setGithubLink}
            liveSite={liveSite} setLiveSite={setLiveSite}
            thumbnails={thumbnails} setThumbnails={setThumbnails}
            workInProgress={workInProgress} setWorkInProgress={setWorkInProgress}
            published={published} setPublished={setPublished}
            onSubmit={onSaveChanges} onSubmitLabel="Save Changes"
        />

        <Controls>
            <Button 
                type="action" 
                size="large"
                theme={theme}
                onClick={onSaveChanges}
                className="control__btn"
                >
                { "Save Changes" }
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

        <DangerZone 
            actionLabel="Delete Project"
            message="This will remove this project definitively."
            setShowAlert={setShowAlert}
            theme={theme}
        />

        <AlertBox 
            show={showAlert}
            setShow={setShowAlert}
            >
            <div className="alert">
                <h3 className="alert__header">Delete Project</h3>

                <h4 className="alert__message">This action will permanently remove project { project.title }. </h4>

                <div className="alert__controls">
                    <Button 
                        type={"danger"}
                        theme={theme}
                        className="alert__btn"
                        onClick={onDeleteProject}
                        >
                        { "Confirm" }
                    </Button>

                    <Button
                        type={"action"}
                        theme={theme}
                        className="alert__btn"
                        onClick={() => setShowAlert(!showAlert)}
                        >
                        { "Cancel" }
                    </Button>
                </div>
            </div>

        </AlertBox>

        <AuthRequiredBox show={showAuthBox} setShow={setShowAuthBox} />
    </Component>;
};

export default EditProject;
