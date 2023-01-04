import { useOutletContext } from "react-router-dom";

const Input = ({ 
    id="", 
    label, 
    placeholder, 
    type="text", 
    value="", 
    setValue,
    checked=false,
    setChecked
}) => {

    const { theme } = useOutletContext();

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
                    className={`input input--theme__${theme}`}  
                    placeholder={placeholder} 
                    rows={5} 
                    value={value}
                    onChange={e => setValue(e.target.value)}
                />
            </div>
        );
    }
    if (type === "checkbox") {
        return (
            <div className="input-group__checkbox">
                <label 
                    htmlFor={id} 
                    className="input__label"
                    >
                    { label }
                </label>
                <input 
                    id={id} 
                    className={`input input__checkbox input--theme__${theme}`}  
                    type={type}
                    checked={checked}
                    onChange={e => setChecked(e.target.checked)}
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
                className={`input input--theme__${theme}`} 
                placeholder={placeholder} 
                type={type} 
                value={value}
                onChange={e => setValue(e.target.value)}
            />
        </div>
    );
};

export default Input;