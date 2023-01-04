import { useOutletContext } from "react-router-dom";
import Input from "./Input";
import TagsEditor from "./TagsEditor";
import TechStackEditor from "./TechStackEditor";

const Form = ({ 
    title, setTitle,
    description, setDescription,
    tags, setTags,
    techstack, setTechstack,
    githubLink, setGithubLink,
    liveSite, setLiveSite,
    thumbnails, setThumbnails,
    workInProgress, setWorkInProgress,
    published, setPublished
 }) => {

    const { theme } = useOutletContext();

    return <form 
        className="form" 
        onSubmit={e => {
            e.preventDefault();
        }}
        >
        <Input
            id="title" 
            placeholder="Project Title" 
            label="Title"
            value={title}
            setValue={setTitle}
        />
        <Input 
            id="description" 
            placeholder="Project Description" 
            label="Description" 
            type="description"
            value={description}
            setValue={setDescription}
        />
        <TechStackEditor 
            techstack={techstack} setTechstack={setTechstack}
        />
        <TagsEditor
            tags={tags} setTags={setTags} theme={theme}
        />
        <Input 
            id="link-to-github"
            placeholder="Link to Github"
            label="Github"
            type="url"
            value={githubLink}
            setValue={setGithubLink}
        />
        <Input 
            id="link-to-live"
            placeholder="Live Website"
            label="Website"
            type="url"
            value={liveSite}
            setValue={setLiveSite}
        />
        <Input 
            id="thumbnails"
            placeholder="Thumbnails"
            label="Link to Thumbnails"
            type="url"
            value={thumbnails}
            setValue={setThumbnails}
        />
        <Input 
            id="workInProgress"
            label="Work in Progress"
            type="checkbox"
            checked={workInProgress} // 'work in progress' === !workInProgress
            setChecked={setWorkInProgress}
        />
        <Input 
            id="published"
            label="Published To API"
            type="checkbox"
            checked={published}
            setChecked={setPublished}
        />
    </form>
};

export default Form;