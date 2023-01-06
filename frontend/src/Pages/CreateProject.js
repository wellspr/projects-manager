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
import Form from "../components/Form";
import Button from "../components/Button";
import Controls from "../components/Controls";
import AuthRequiredBox from "../components/AuthRequiredBox";

// API
import { projects } from "../api";

// Local Storage
import { local, temp } from "../local";


const CreateProject = () => {

    const { session, theme } = useOutletContext();
    const savedProject = useLoaderData();

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

    const [showAuthBox, setShowAuthBox] = useState(false);


    /** In case there is some saved project */
    useEffect(() => {
        if (savedProject) {
            setTitle(savedProject.title || "");
            setDescription(savedProject.description || "");
            setTags(savedProject.tags || []);
            setTechstack(savedProject.techstack || []);
            setGithubLink(savedProject.githubLink || "");
            setLiveSite(savedProject.liveSite || "");
            setThumbnails(savedProject.thumbnails || []);
            setWorkInProgress(savedProject.workInProgress || false);
            setPublished(savedProject.published || false);
        }

        temp.removeData("saved_project");
    }, [savedProject]);


    /** onAddProject */
    const onAddProject = () => {

        const project = {
            title,
            description,
            tags,
            techstack,
            githubLink,
            liveSite,
            thumbnails,
            workInProgress,
            published,
            dateAdded: Date.now(),
            dateModified: null,
            userId: session.userId,
        };

        projects.addProject(project)
            .then(r => {
                /** Add project to local data */
                local.projects.add(r.data);
                
                /** Navigate back to "/projects" */
                navigate("/projects", {
                    state: { scrollToTop: true }
                });
            })
            .catch(err => {
                console.log("Could not create new project. ", err.message);
                    
                /** Store updates to recover after authentication */
                temp.setData("saved_project", project);
                
                if (err.response.status === 401) {
                    /** Open alert box for authentication */
                    console.log("Authentication required");
                    temp.setData("navigationState", { nextUrl: location.pathname });
                    setShowAuthBox(true);
                }
            });
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
            workInProgress={workInProgress} setWorkInProgress={setWorkInProgress}
            published={published} setPublished={setPublished}
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

        <AuthRequiredBox show={showAuthBox} setShow={setShowAuthBox} />
    </Component>;
};

export default CreateProject;
