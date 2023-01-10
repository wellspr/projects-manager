// Components
import { Link } from "react-router-dom";
import { Component } from "../components/Component";
import HomeCard from "../components/HomeCard";

import projectsImage from "../images/projects.svg";
import settingsImage from "../images/settings_1.svg"


const Home = () => {
    return <Component>

        <div className="home-heading">
            <h2 className="home-heading__header">
                View, manage and create projects.
            </h2>
        </div>

        <div className="home-cards">
            <HomeCard>
                <Link to="/projects" className="home-card__link">
                    <h2 className="home-card__link__title">My Projects</h2>
                    <Image 
                        svg={projectsImage} 
                        size={200} 
                        className="home-card__link__image"
                    />
                </Link>
            </HomeCard>

            <HomeCard>
                <Link to="/settings" className="home-card__link">
                    <h2 className="home-card__link__title">App Settings</h2>
                    <Image 
                        svg={settingsImage} 
                        size={200} 
                        className="home-card__link__image"
                    />
                </Link>
            </HomeCard>
        </div>

    </Component>;
};

const Image = ({ svg, size, className }) => {
    return <div 
        style={{ 
            height: `${size}px`,
        }}
        >
        <img src={svg} alt={"svg"} height={size} className={className} / >
    </div>;
}

export default Home;
