import { Link } from "react-router-dom";

const Brand = () => {
    return (
        <div className="brand">
            <h1 className="brand__text">
                <Link to={"/"}>Projects Manager</Link>
            </h1>
        </div>
    );
};

export default Brand;