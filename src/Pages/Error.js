import { useRouteError } from "react-router-dom";
import Page from "../Layout/Page";

const Error = () => {

    const error = useRouteError();

    console.log(error);
    
    const renderErrorMesage = () => {
        if (error.status) {
            return <p>{ error.status } - { error.statusText }</p>;
        }

        if (error.response) {
            return <p>{ error.response.status } - { error.response.statusText }</p>;
        }
    }

    return <Page>
        <h2>Oops... an error occured.</h2>
        { renderErrorMesage() }
    </Page>
};

export default Error;