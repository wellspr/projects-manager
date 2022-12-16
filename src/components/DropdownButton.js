// React
import React, { useRef, useState, useEffect, forwardRef } from "react";

// React Router Dom
import { useLocation } from "react-router-dom";

// Components
import Button from "./Button";


const DropdownButton = ({ buttonContent, dropdownContent }) => {

    const location = useLocation();

	const buttonRef = useRef(null);
    const dropdownRef = useRef(null);

    const [show, setShow] = useState(false);

    useEffect (() => {
        const buttonCurrentRef = buttonRef && buttonRef.current;
        const dropdownCurrentRef = dropdownRef && dropdownRef.current;
        
		const onClickBody = e => {
			if (buttonCurrentRef && dropdownCurrentRef) {
				if (buttonCurrentRef.contains(e.target) || dropdownCurrentRef.contains(e.target)) {
					return null;
				}
				return setShow(false);
			}
        };

        document.body.addEventListener("click", onClickBody);

        return () => document.body.removeEventListener("click", onClickBody);
    }, [show, setShow]);

    useEffect(() => setShow(false), [location]);

	return (
		<div className="dropdown__button" ref={buttonRef}>
            <Button
                type="dropdown" 
                onClick={() => setShow(!show)}
                >
                { buttonContent() }
            </Button>
            <Dropdown 
                show={show} 
                setShow={setShow}
                ref={dropdownRef} 
                >
                { dropdownContent() }
            </Dropdown>
        </div>
	);
};

const Dropdown = forwardRef(({ show, children }, ref) => {

	if (!show) return null;

	return <div className="dropdown-wrapper">
		<div className="dropdown" ref={ref}>
			{ children }
		</div>
	</div>;
});

export default DropdownButton;