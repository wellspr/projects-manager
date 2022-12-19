import { useRef } from "react";

const Button = ({ type, size, theme, disabled, className, onClick, children }) => {

    const btnRef = useRef(null);

    let classNameString = "button";

    if (type) {
        classNameString += 
        ` button--${type} button--${type}__${theme}`;
    }
    if (size) {
        classNameString += ` button--${size}`;
    }
    if (theme) {
        classNameString += ` button--theme__${theme}`;
    }
    if (className) {
        classNameString += ` ${className}`;
    }
    
//    console.log(btnRef && btnRef.current.offsetWidth);
//    console.log(btnRef && btnRef.current.style);

    return (
        <button 
            className={classNameString} 
            onClick={onClick}
            disabled={disabled}
            ref={btnRef}
            >
            { children }
        </button>
    );
};

export default Button;
