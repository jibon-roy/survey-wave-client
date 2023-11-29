import { Link } from "react-router-dom";


const Error = () => {
    return (
        <div className="h-[100vh] w-full flex justify-center items-center">
            <div>
                <p className="text-5xl">Opps...</p>
                <p className="text-[10vw]">404</p>
                <p className="mb-5 text-xl">Page not found...</p>
                <Link to='/' className="font-medium text-primary-bg rounded-lg mt-5 px-4 py-2 bg-primary-main">Back to home</Link>
            </div>
        </div>
    );
};

export default Error;