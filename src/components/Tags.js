const Tags = ({ tags, theme }) => {

	const renderTags = () => {
		return tags && Object.values(tags).map((tag, index) => {
			return <span 
				key={`${index}-${tag.key}`} 
				className={`tags__item tags__item--theme__${theme}`}
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