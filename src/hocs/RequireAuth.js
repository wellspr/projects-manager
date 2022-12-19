// React
import { useEffect } from "react";

// React Router Dom
import { Outlet, useLoaderData, useRevalidator } from "react-router-dom";

// Pages
import Auth from "../Pages/Auth";


const RequireAuth = () => {

    const session = useLoaderData();

    const theme = (session && session.theme) || "dark";

    const revalidator = useRevalidator();

    useEffect(() => {
        const onFocus = () => {
            console.log("FOCUS");
            revalidator.revalidate();
        };

        window.addEventListener("focus", onFocus);

        return () => window.removeEventListener("focus", onFocus);

    }, [revalidator]);

    const renderApp = () => {

        if (!session) {
            return (
                <Auth theme={theme} />
            );
        }

        return <Outlet context={ session } />;
    }

    return renderApp();
};

export default RequireAuth;
