import { useEffect } from "react";
import { Outlet, useLoaderData, useRevalidator } from "react-router-dom";
import Auth from "../Pages/Auth";

const RequireAuth = () => {

    const session = useLoaderData();

    console.log(session);

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
                <Auth />
            );
        }

        return <Outlet context={ session } />;
    }

    return renderApp();
};

export default RequireAuth;
