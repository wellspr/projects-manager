// React Icons
import { AiFillGithub, AiOutlineEye } from "react-icons/ai";
import { MdWeb } from "react-icons/md";
import { IoTimerOutline } from "react-icons/io5";
import { HiCheck } from "react-icons/hi";
import { Link } from "react-router-dom";

import Tags from "./Tags";
import Button from "./Button";


const Project = ({ project, theme }) => {

	const d = project.dateAdded && new Date(project.dateAdded);

	return <div className="project">
		<h3 className="project__title">
			{ project.title }
			<Button className={`project__title__button button--theme__${theme}`}>
				<Link to={`/projects/project/${project.key}`}>
					<div className="project__title__link">
						<p>View</p>
						<AiOutlineEye size={20} />	
					</div>
				</Link>
			</Button>
		</h3>
		<p className="project__desc">{ project.description }</p>
		<div className="project__linkList">
			<a 
				className="project__link" 
				href={project.githubLink}
				target="_blank"
				rel="noreferrer"
				>
				<span className="project__link__label">Github</span>
				<AiFillGithub />
			</a>
			<a 
				className="project__link" 
				href={project.liveSite}
				target="_blank"
				rel="noreferrer"
				>
				<span className="project__link__label">Live</span>
				<MdWeb />
			</a>
		</div>

		<div className="project__footer">
			<div className="project__footer__date">
				{ d && <p>Added: { d.toLocaleDateString() }</p> }
			</div>
			{
				project.workInProgress 
				&& 
				<div className="project__footer__work-in-progress">
					<p>Work in Progress</p> 
					<IoTimerOutline 
						color={ theme==="dark" ? "orange" : "brown" }
						size={20} 
					/>
				</div>
			}
			{
				project.published
				&& 
				<div className="project__footer__published">
					<p>Published to API</p> 
					<HiCheck color="green" size={24} />
				</div>
			}
		</div>

		<Tags tags={project.tags} theme={theme} />
	</div>;
};

export default Project;