import { useRouteError, Link } from "react-router-dom";

const ErrorPage = () => {
    const error = useRouteError();
    console.error(error);

    return (
        <div id="error-page" className="min-h-screen flex flex-col items-center justify-center bg-base-200">
            <h1 className="text-4xl font-bold mb-4">Oops!</h1>
            <p className="text-xl mb-4">Sorry, an unexpected error has occurred.</p>
            <p className="text-gray-500 mb-8">
                <i>{error.statusText || error.message}</i>
            </p>
            <Link to="/" className="btn btn-primary">Go Back Home</Link>
        </div>
    );
};

export default ErrorPage;
