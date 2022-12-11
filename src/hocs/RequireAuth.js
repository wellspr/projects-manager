import { useEffect } from "react";
import { Outlet, useLoaderData, useRevalidator } from "react-router-dom";

const RequireAuth = () => {

    const data = useLoaderData();

    const revalidator = useRevalidator();

    useEffect(() => {
        const onFocus = () => {
            console.log("FOCUS");
            revalidator.revalidate();
        };

        window.addEventListener("focus", onFocus);

        return () => {
            window.removeEventListener("focus", onFocus);
        }
    }, [revalidator]);

    return <div className="auth">
        <Outlet context={data} />
    </div>
};

export default RequireAuth;