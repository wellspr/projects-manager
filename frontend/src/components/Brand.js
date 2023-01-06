import { Link } from "react-router-dom";

const Brand = ({ size }) => {

    let className = `brand__text`;
    if (size && size==="large") {
        className += " brand__text--large";
    }

    return (
        <div className="brand">
            <h1 className={className}>
                <Link to={"/"}>Projects Manager</Link>
            </h1>
        </div>
    );
};

export default Brand;