import Button from "./Button";

const DangerZone = ({ actionLabel, message, setShowAlert, theme }) => {
	return (
		<div className="danger-zone">
            <Button 
                type="danger" 
                size="large" 
                theme={theme}
                onClick={() => { 
                    setShowAlert(true);
                }}
                >
                { actionLabel }
            </Button>

            <div className="danger-zone__text-wrapper">
                <p className="danger-zone__text">{ message }</p>
            </div>
        </div>
	);
};

export default DangerZone;