// React
import { useEffect } from "react";

// React Router Dom
import { Outlet, useLoaderData, useNavigate } from "react-router-dom";

// Local Data Storage
import { setData } from "../local/sessionStorage";


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
        if (session) {
            setData({
                key: "session",
                value: session,
            });
        } else {
            navigate("/login");
        }
    }, [session, navigate]);

    const renderApp = () => {
        return <Outlet context={ session } />;
    }

    return renderApp();
};

export default RequireAuth;
