import { ImSpinner2 } from "react-icons/im";

const Loading = () => {
	return (
		<div className="loading"> 
			<div className="loading__spinner ld ld-cycle">
				<ImSpinner2 size={40} />
			</div>
			<div className="loading__text">Loading Application</div>
		</div>
	);
};

export default Loading;