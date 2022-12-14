const Tags = ({ tags }) => {

	const renderTags = () => {
		return tags && Object.values(tags).map((tag, index) => {
			return <span 
				key={`${index}-${tag.key}`} 
				className="tags__item"
				>
				{tag.name}
			</span>
		});
	};

	return <div className="tags">
		{ renderTags() }
	</div>
};

export default Tags;