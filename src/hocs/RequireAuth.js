// React
import { useEffect } from "react";

// React Router Dom
import { Outlet, useLoaderData, useNavigate } from "react-router-dom";


const RequireAuth = () => {

    const session = useLoaderData();
    const navigate = useNavigate();

    useEffect(() => {

        const onFocus = () => {
            console.log("FOCUS");
        };

        window.addEventListener("focus", onFocus);

        return () => window.removeEventListener("focus", onFocus);
    }, []);

    useEffect(() => {
        if (!session) navigate("/login");
    }, [session, navigate]);

    const renderApp = () => {
        return <Outlet context={ session } />;
    };

    return renderApp();
};

export default RequireAuth;
