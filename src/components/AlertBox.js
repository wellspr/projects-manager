import { AiOutlineClose } from "react-icons/ai";

const AlertBox = ({ show, setShow, children }) => {

    if (!show) return null;

    return <div className="alertBox">
        <div className="alertBox__box">
            <div 
                className="alertBox__box__control"
                onClick={() => {
                    setShow(!show);
                }}
                >
                <AiOutlineClose />
            </div>
            {children}
        </div>;
    </div>;
};

export default AlertBox;