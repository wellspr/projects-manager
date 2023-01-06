// React
import { useEffect, useState } from "react";

// React Router Dom
import { 
    Outlet, 
    useLoaderData, 
    useLocation, 
    useNavigate 
} from "react-router-dom";

// Components
import AuthRequiredBox from "../components/AuthRequiredBox";

// API
import { users } from "../api";

// Local Data
import { local } from "../local";



const RequireAuth = () => {

    const loadedData = useLoaderData();
    const navigate = useNavigate();
    const location = useLocation();
    
    const [session, setSession] = useState(loadedData);

    const [show, setShow] = useState(false);


    /** On Focus app... */
    useEffect(() => {
        const onFocus = () => {
            console.log("FOCUS");
        };
        window.addEventListener("focus", onFocus);
        return () => window.removeEventListener("focus", onFocus);
    }, []);


    /** On load app... */
    useEffect(() => {
        const onLoad = () => {
            users.checkSession().then(r => {
                if (!r.data) {
                    /** If there is no session on server...
                        ...clear session */
                    local.session.removeData();
                    setSession(null);
                }
            });
        };

        window.addEventListener("load", onLoad);

        return () => window.removeEventListener("load", onLoad);
    }, []);


    /** If not logged in redirect to "/login" */
    useEffect(() => {
        if (!session) {
            navigate("/login");
        }
    }, [session, navigate]);

    
    /** If user is logged in and navigates to "/login", navigate back to "/" */
    useEffect(() => {
        if (session && location.pathname==="/login") {
            navigate("/");
        }
    }, [session, location, navigate]);

    
    const renderApp = () => {
        /** Render an authentication box if session is expired */
        <AuthRequiredBox show={show} setShow={setShow} />

        /** Render null if user is logged in and navigates to "/login" */
        if (session && location.pathname==="/login") {
            return null;
        }

        /** Normal app flow rendering */
        return <Outlet context={ session } />;
    };

    return renderApp();
};

export default RequireAuth;
