import { useNavigate, useRouteError } from "react-router-dom";
import Button from "../components/Button";
import Page from "../Layout/Page";

const Error = () => {

    const error = useRouteError();

    const navigate = useNavigate();

    console.log(error);
    
    const renderErrorMesage = () => {
        if (error.status) {
            return <p className="error__message">{ error.status } - { error.statusText }</p>;
        }

        if (error.response) {
            return <p className="error__message">{ error.response.status } - { error.response.statusText }</p>;
        }
    }

    return <Page>
        <div className="error">
            <h2 className="error__header">Oops... an error occured.</h2>
            { renderErrorMesage() }

            <Button className="button button--action" onClick={() => navigate("/")}>
                Try again
            </Button>
        </div>
    </Page>
};

export default Error;