import { useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import Page from "../Layout/Page";

const Response = () => {

    const data = useLoaderData();

    useEffect(() => {
        console.log(data);
    }, [data]);

    const renderLoginResult = () => {
        if (data.error) {
            const { error, error_description, error_uri } = data;
            return <div>
                <p>Error: { error }</p>
                <p>{ error_description.replace(/[+]/g, " ") }</p>
                <a href={error_uri}>{ error_uri }</a>
            </div>;
        }

        const { id, name, login, avatar_url } = data;
        return <div>
            <h2>Success!</h2>

            <p>Github ID: { id }</p>
            <p>Github Login: { login }</p>
            
            <p>Name: { name }</p>

            <img src={avatar_url} alt="Avatar" height="100px"></img>
        </div>;
    };

    return <Page>
        { renderLoginResult() }
    </Page>;
};

export default Response;