import { useState } from "react";
import { useOutletContext } from "react-router-dom";

const TechStackEditor = ({ techstack, setTechstack }) => {

    const { theme } = useOutletContext();

    const [tech, setTech] = useState("");

    const renderTechStack = techstack && Object.values(techstack).map((tech, index) => {
        if (tech.length === 0) return null;
        return <li 
            key={`${index}-${tech}`}
            className="listTech__tech"
            >
            {tech}

        </li>;
    });

    return <div className="input-group">
        <label 
            htmlFor="tech-stack"
            className="input__label"
            >
            TechStack
        </label>
        <div className="listTechStack">{ renderTechStack }</div>
        <input 
            id="tech-stack"
            className={`input input--theme__${theme}`}
            placeholder="Add Tech"
            value={tech}
            onChange={e => setTech(e.target.value)}
            onKeyDown={e => {
                if (e.key === "Enter") {
                    setTechstack([...techstack, tech]);
                    setTech("");
                }
            }}
        />
    </div>;
};

export default TechStackEditor;