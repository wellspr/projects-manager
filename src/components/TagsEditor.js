import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";

const TagsEditor = ({ tags, setTags }) => {
    
    const [newTag, setNewTag] = useState("");

    const renderTags = tags && Object.values(tags).map((tag, index) => {
        if (tags.length === 0) return null;
        return <span 
            key={`${index}-${tag}`}
            className="listTags__tag"
            >
            {tag.name} 
            <div 
                className="listTags__tag__icon"
                onClick={() => {
                    console.log(tag)
                    const newTagsObject = { ...tags };
                    delete newTagsObject[tag.name];
                    setTags(newTagsObject);
                }}    
                >
                <AiOutlineClose />
            </div>
        </span>;
    });

    const addTag = () => {
        const newTagsObject = { ...tags };
        newTagsObject[newTag] = { name: newTag }
        setTags(newTagsObject);
        setNewTag("");
    };

    return <div className="input-group">
        <label 
            htmlFor="tags-input"
            className="input__label"
            >
            Tags
        </label>
        <div className="listTags">{ renderTags }</div>
        <input
            id="tags-input" 
            className="input"
            placeholder="Add Tag"
            value={newTag}
            onChange={e => setNewTag(e.target.value)}
            onKeyDown={e => {
                if (e.key === "Enter") {
                    addTag();
                }
            }}
        />
    </div>;
};

export default TagsEditor;