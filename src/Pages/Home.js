// Components
import { Link } from "react-router-dom";
import { Component } from "../components/Component";
import HomeCard from "../components/HomeCard";


const Home = () => {
    return <Component>

        <div className="home-heading">
            <h2 className="home-heading__header">
                View, manage and create projects.
            </h2>
        </div>

        <HomeCard>
            <Link to="/projects" className="home-card__link">
                <h2>Projects</h2>
            </Link>
        </HomeCard>

        <HomeCard>
            <Link to="/settings" className="home-card__link">
                <h2>Settings</h2>
            </Link>
        </HomeCard>

    </Component>;
};

export default Home;
