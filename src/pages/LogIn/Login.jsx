// import { FormControl, FormHelperText, InputLabel } from '@mui/material';
// import { Input } from 'postcss';
import { FcGoogle } from "react-icons/fc";

import { Link } from "react-router-dom";
import CustomHeader from "../../components/customHeader/CustomHeader";
import { Divider } from "@mui/material";
import useAuthProvider from "../../hooks/useAuthProvider";
import Swal from "sweetalert2";

// import { TextField } from "@mui/material";


const Login = () => {

    const { logInWithEmailPass, gmailUser } = useAuthProvider()

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        const email = form.email.value;
        const password = form.password.value;

        logInWithEmailPass(email, password)
            .then(result => {
                if (result)
                    if (result) {
                        Swal.fire({
                            title: "Log In Success!",
                            text: "See You Again",
                            icon: "success"
                        }).then(location.reload());
                    }

            })
            .catch(error => {
                if (error)
                    Swal.fire({
                        title: "Opps...",
                        text: "Something is wrong!",
                        icon: "error"
                    });
            })

    };

    return (
        <section className="text-gray-600 min-h-screen pb-5 body-font pt-10">
            <CustomHeader name='Login' subject='Login to Your Account'></CustomHeader>
            <div className="container mx-auto md:flex items-center">
                <div className="lg:w-3/5 md:w-1/2 md:pr-16 lg:pr-0 pr-0">
                    <img src="/logo.png" className="w-[70%] blok mx-auto"></img>
                    <h1 className="title-font md:px-8 font-medium text-center text-3xl text-gray-900 mb-4">Login to Your Account</h1>
                    <p className="leading-relaxed md:px-8 text-center mt-4">Access your surveys and enjoy a seamless experience.</p>
                </div>
                <div className="lg:w-2/6 md:w-1/2 mb-20 mx-auto md:mr-4 bg-gray-100 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 border-2 border-primary-main md:mt-0">
                    <h2 className="text-gray-900 text-lg font-medium title-font mb-5">Sign In</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="relative mb-4">
                            <label htmlFor="email" className="leading-7 text-sm text-gray-600">
                                Email
                            </label>
                            <input
                                autoComplete="on"
                                type="email"
                                id="email"
                                name="email"
                                required
                                className="w-full bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                            />
                        </div>
                        <div className="relative mb-4">
                            <label htmlFor="password" className="leading-7 text-sm text-gray-600">
                                Password
                            </label>
                            <input
                                autoComplete="on"
                                type="password"
                                id="password"
                                required
                                name="password"
                                className="w-full bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                            />
                        </div>
                        <button
                            type="submit"
                            className="text-white w-full bg-blue-500 border-0 py-2 px-8 focus:outline-none hover:bg-blue-600 rounded text-lg"
                        >
                            Login
                        </button>
                    </form>
                    <div className="text-sm text-gray-500 mt-3">
                        Dont have an account? <Link to='/signUp' className="text-blue-500">
                            Sign Up
                        </Link>
                        <div className="mt-5">
                            <Divider sx={{ fontSize: '20px' }}>or</Divider>
                        </div>
                        <div>
                            <button onClick={gmailUser} className="w-full bg-gray-200 text-primary-text flex justify-center hover:bg-gray-300 border-0 py-2 px-8 focus:outline-none rounded gap-2 my-5 text-lg">Continue with<FcGoogle className="text-3xl"></FcGoogle></button>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Login;
