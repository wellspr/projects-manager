const Button = ({ 
    type, 
    size, 
    theme, 
    className, 
    disabled, 
    onClick, 
    children,
}) => {

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
    
    return (
        <button 
            className={classNameString} 
            onClick={onClick}
            disabled={disabled}
            >
            { children }
        </button>
    );
};

export default Button;
