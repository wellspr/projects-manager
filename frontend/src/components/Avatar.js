import { useState } from "react";

const Avatar = ({ src, size, className, defaultElement }) => {
	const [loadComplete, setLoadComplete] = useState(false);
	const [loadError, setLoadError] = useState(false);

	const onLoadSrc = () => setLoadComplete(true);
	const onFailedSrc = () => setLoadError(true);

	if (loadError) {
		return <>
			{ defaultElement }
		</>
	}

	const style = {};
	["height", "width"].forEach(prop => style[prop] = `${size}px`);

	return <div style={style}>
		<img 
			className={className}
			src={src}
			alt="Avatar" 
			height={size} 
			width={size}
			onLoad={onLoadSrc}
			onError={onFailedSrc}
			hidden={!loadComplete?true:false}
		/>
	</div>;
};

export default Avatar;