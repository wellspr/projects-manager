import { useLoaderData } from "react-router-dom";

const Response = () => {

    const data = useLoaderData();

    const renderLoginResult = () => {
        if (data.error) {
            const { error, error_description, error_uri } = data;
            return <div>
                <p>Error: { error }</p>
                <p>{ error_description.replace(/[+]/g, " ") }</p>
                <a href={error_uri}>{ error_uri }</a>
            </div>;
        }
    };

    return renderLoginResult();
};

export default Response;