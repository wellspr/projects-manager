const Input = ({ 
    id="", 
    label, 
    placeholder, 
    type="text", 
    value="", 
    setValue 
}) => {
    if (type === "description") {
        return (
            <div className="input-group">
                <label 
                    htmlFor={id} 
                    className="input__label"
                    >
                    { label }
                </label>
                <textarea 
                    id={id} 
                    className="input" 
                    placeholder={placeholder} 
                    rows={5} 
                    value={value}
                    onChange={e => setValue(e.target.value)}
                />
            </div>
        );
    }
    return (
        <div className="input-group">
            <label 
                htmlFor={id} 
                className="input__label"
                >
                { label }
            </label>
            <input 
                id={id} 
                className="input" 
                placeholder={placeholder} 
                type={type} 
                value={value}
                onChange={e => setValue(e.target.value)}
            />
        </div>
    );
};

export default Input;