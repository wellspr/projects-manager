import { Link, useLoaderData, useOutletContext } from "react-router-dom";
import { Component, Header } from "../components/Component";
import Tags from "../components/Tags";
import { AiFillGithub } from "react-icons/ai";
import { MdWeb } from "react-icons/md";
import { IoTimerOutline } from "react-icons/io5";
import { HiCheck } from "react-icons/hi";

const Project = () => {

	const { theme } = useOutletContext();
    const project = useLoaderData();

	console.log(project)

	const renderTechstack = () => {
		return project.techstack.map(tech => {
			const key = Math.floor(Math.random()*100000);
			return <li key={key}>{ tech }</li>
		});
	}

	const added = project.dateAdded && new Date(project.dateAdded);
	const updated = project.dateModified && new Date(project.dateModified);

	return <Component>
		<Header title="Project" theme={theme}>
			<div className="project-view__header__link">
				<Link to={`/projects/edit/${project.key}`}>Edit</Link>
			</div>
		</Header>

		<div className="project-view">

			<h2 className="project-view__label">Title</h2>
			<h3 className="project-view__title">{ project.title }</h3>

			<h2 className="project-view__label">Description</h2>
			<p className="project-view__description">{project.description}</p>

			<h2 className="project-view__label">Tech Stack</h2>
			<ul className="project-view__techstack">{ renderTechstack() }</ul>

			<h2 className="project-view__label">Links</h2>
			<div className="project-view__linkList">
				<a 
					className="project-view__link" 
					href={project.githubLink}
					target="_blank"
					rel="noreferrer"
					>
					<span className="project-view__link__label">Github</span>
					<AiFillGithub />
				</a>
				<a 
					className="project-view__link" 
					href={project.liveSite}
					target="_blank"
					rel="noreferrer"
					>
					<span className="project-view__link__label">Live</span>
					<MdWeb />
				</a>
			</div>

			<h2 className="project-view__label">Info</h2>
			<div className="project-view__info">
				{ 
					added 
					&& 
					<div className="project-view__info__date project-view__info__date--added">
						<p>Added: { added.toLocaleDateString() }</p>
					</div>
				}
				{ 
					updated 
					&& 
					<div className="project-view__info__date project-view__info__date--updated">
						<p>Updated: { updated.toLocaleDateString() }</p>
					</div>
				}
				{
					project.workInProgress 
					&& 
					<div className="project-view__info__work-in-progress">
						<p>Work in Progress</p> 
						<IoTimerOutline color="brown" />
					</div>
				}
				{
					project.published
					&& 
					<div className="project-view__info__published">
						<p>Published to API</p> 
						<HiCheck color="green" />
					</div>
				}
			</div>

			<h2 className="project-view__label">Tags</h2>
			<Tags tags={project.tags} theme={theme} />

		</div>
	</Component>;
};

export default Project;