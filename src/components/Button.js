const Button = ({ type, size, disabled, className, onClick, children }) => {
    let classNameString = "button";
    if (type) {
        classNameString += ` button--${type}`;
    }
    if (size) {
        classNameString += ` button--${size}`;
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
