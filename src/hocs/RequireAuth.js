// React
import { useEffect } from "react";

// React Router Dom
import { Outlet, useLoaderData, useRevalidator } from "react-router-dom";

// Pages
import Auth from "../Pages/Auth";

// Local Data Storage
import { setData, getData } from "../local/sessionStorage";


const RequireAuth = () => {

    const session = useLoaderData();

    const theme = (session && session.theme) || "dark";

    const revalidator = useRevalidator();

    useEffect(() => {
        const onFocus = () => {
            console.log("FOCUS");

            const session = getData("session");

            if (!session) {
                revalidator.revalidate();
            }
        };

        window.addEventListener("focus", onFocus);

        return () => window.removeEventListener("focus", onFocus);

    }, [revalidator]);

    useEffect(() => {
        if (session) {
            setData({
                key: "session",
                value: session,
            });
        }
    }, [session]);

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
