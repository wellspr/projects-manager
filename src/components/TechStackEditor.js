// React
import { useRef, useState } from "react";

// React Router Dom
import { useOutletContext } from "react-router-dom";


import Button from "./Button";

import { FiEdit, FiTrash2 } from "react-icons/fi";


const TechStackEditor = ({ techstack, setTechstack }) => {

    const { theme } = useOutletContext();

    const [techCategory, setTechCategory] = useState("");
    const [techDescription, setTechDescription] = useState("");

    const inputCategoryRef = useRef(null);
    const inputDescriptionRef = useRef(null);

    const renderTechStack = 
        Object.values(techstack).length > 0 && 
        Object.values(techstack).map((tech, index) => {
            return <li key={`${index}-${tech}`} className="listTech__tech">
                <div><strong>{ tech.category }</strong>: { tech.description }</div>

                <div className="listTech__tech__buttons">
                    <Button 
                        className={`listTech__tech__button button--theme__${theme} listTech__tech__button--edit`} 
                        onClick={e => {    
                            setTechCategory(tech.category);
                            setTechDescription(tech.description);
                        }}
                        >
                        <div className="listTech__tech__button__label">
                            <span className="listTech__tech__button__label__text">Edit</span>
                            <FiEdit size={16}/>
                        </div>
                    </Button>

                    <Button 
                        className={`listTech__tech__button button--theme__${theme} listTech__tech__button--remove`} 
                        onClick={e => {    
                            console.log("delete ", tech)
                        }}
                        >
                        <div className="listTech__tech__button__label">
                            <span className="listTech__tech__button__label__text">Remove</span>
                            <FiTrash2 size={16}/>    
                        </div>
                    </Button>
                </div> 
                
            </li>;
        });

    return <div className="input-group">
        <label 
            htmlFor="tech-stack-category"
            className="input__label"
            >
            TechStack
        </label>
        <div className="listTechStack">{ renderTechStack }</div>
        <input 
            id="tech-stack-category"
            ref={inputCategoryRef}
            className={`input input--theme__${theme}`}
            placeholder="Tech Category"
            value={techCategory}
            onChange={e => setTechCategory(e.target.value)}
            onKeyDown={e => {
                if (e.key === "Enter") {
                    e.preventDefault(); 
                    /** This is important to prevent a weired behavior: 
                    a keyDown here was triggering a click on the 'edit' button */
                    
                    inputDescriptionRef.current.focus();
                }
            }}
        />
        <input 
            id="tech-stack-description"
            ref={inputDescriptionRef}
            className={`input input--theme__${theme}`}
            placeholder="Description"
            value={techDescription}
            onChange={e => setTechDescription(e.target.value)}
            onKeyDown={e => {
                if (e.key === "Enter") {
                    e.preventDefault(); 
                    /** This is important to prevent a weired behavior: 
                    a keyDown here was triggering a click on the 'edit' button */
                    /** 
                     * Update techstack */
                    console.log("On update tech: ", techstack);

                    /** If there is a tech with key === techCategory  -->  update value to techDescription*/
                    const updateExistingTech = Object.values(techstack).some(tech => {
                        return tech.category === techCategory;
                    });

                    if (updateExistingTech) {
                        const newTechstack = Object.values(techstack).map(tech => {
                            if (tech.category === techCategory) {
                                tech.description = techDescription;
                            }
                            return tech;
                        });

                        setTechstack(newTechstack);
                    }

                    /** Else create a new key and values */
                    else {
                        setTechstack([ ...techstack, {
                            category: techCategory,
                            description: techDescription
                        }]);
                    }

                    /** Clean Inputs */
                    setTechCategory("");
                    setTechDescription("");

                    inputCategoryRef.current.focus();
                }
            }}
        />
    </div>;
};

export default TechStackEditor;