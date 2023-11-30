// import { FormControl, FormHelperText, InputLabel } from '@mui/material';
// import { Input } from 'postcss';
import { FcGoogle } from "react-icons/fc";
import { useForm } from "react-hook-form"
import { Link } from "react-router-dom";
import CustomHeader from "../../components/customHeader/CustomHeader";
import { Divider } from "@mui/material";
import useAuthProvider from "../../hooks/useAuthProvider";
// import axios from "axios";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Swal from "sweetalert2";
// import { updateCurrentUser } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import { updateProfile } from "firebase/auth";
import { useState } from "react";

// import { TextField } from "@mui/material";


const SignUp = () => {

    const { createUserWithEmailPass, gmailUser } = useAuthProvider()
    const axiosPublic = useAxiosPublic()
    const [passwordError, setPasswordError] = useState('');
    // const imgHostingKey = import.meta.env.VITE_IMAGE_KEY
    // console.log(imgHostingKey)
    // const imgHostingApi = `https://api.imgbb.com/1/upload?key=${imgHostingKey}`

    // console.log(user)
    const { register, handleSubmit } = useForm()
    const onSubmit = async (data) => {
        // console.log(data);
        const email = data.email;
        const name = data.name;
        const image = data.image;
        const password = data.password;
        if (password.length < 6) {
            setPasswordError('Password is less then 6 Character.');
            return;
        } else if (!/[A-Z]/.test(password)) {
            setPasswordError('Password does\'nt have a capital letter.')
            return;
        } else if (!/[@#$%^&+=]/.test(password)) {
            setPasswordError('Password does\'nt have a special character.')
            return;
        } else {
            setPasswordError('');
        }
        const role = 'user'
        const userData = { name, email, image, role }

        createUserWithEmailPass(email, password)
            .then(result => {
                if (result.user) {
                    updateProfile(auth.currentUser, {
                        displayName: name,
                        photoURL: image
                    })
                    axiosPublic.post('/newUser', userData)
                        .then(res => {
                            if (res) {
                                Swal.fire({
                                    title: "Log In Success!",
                                    text: "Welcome",
                                    icon: "success"
                                }).then(location.reload())
                            }
                        })

                }
            })
            .catch(error => {
                if (error)
                    Swal.fire({
                        title: "Opps...",
                        text: "Email already exist or anything wrong",
                        icon: "error"
                    });
            })

    }

    // const img = { image: data.image[0] }
    // const res = await axios.post(imgHostingApi, img, { 'Content-Type': 'multipart/form-data' })

    // console.log(res.data)

    return (
        <section className="text-gray-600 min-h-screen pb-5 body-font pt-10">
            <CustomHeader name='Sign Up' subject='Create an Account'></CustomHeader>
            <div className="container mx-auto -mt-5 md:flex items-center">
                <div className="lg:w-3/5 md:w-1/2 md:pr-16 lg:pr-0 pr-0">
                    <img src="/logo.png" className="w-[70%] blok mx-auto"></img>
                    <h1 className="title-font md:px-8 font-medium text-center text-3xl text-gray-900 mb-4">Register for Free</h1>
                    <p className="leading-relaxed md:px-8 text-center mt-4">Access your surveys and enjoy a seamless experience.</p>
                </div>
                <div className="lg:w-2/6 md:w-1/2 mb-20 mx-auto md:mr-4 bg-gray-100 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 border-2 border-primary-main md:mt-0">
                    <h2 className="text-gray-900 text-lg font-medium title-font mb-5">Sign Up</h2>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="relative mb-2">
                            <label htmlFor="name" className="leading-7 text-sm text-gray-600">
                                Name
                            </label>
                            <input
                                id='name'
                                autoComplete="on"
                                type="text"
                                required
                                {...register("name", { required: true })}
                                className="w-full bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                            />
                        </div>
                        <div className="relative mb-2">
                            <label htmlFor="email" className="leading-7 text-sm text-gray-600">
                                Email
                            </label>
                            <input
                                autoComplete="on"
                                id='email'
                                type="email"
                                required
                                {...register("email", { required: true })}
                                className="w-full bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                            />
                        </div>

                        <label className="leading-7 text-sm text-gray-600" htmlFor="file_input">Image Url</label>
                        <input
                            id='file_input'
                            {...register("image", { required: true })}
                            required
                            className="w-full bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                            type="link" />

                        <div className="relative mb-2">
                            <label htmlFor="password" className="leading-7 text-sm text-gray-600">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                {...register("password", { required: true })}
                                name="password"
                                required
                                className="w-full bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                            />
                        </div>
                        <label className="label">
                            <div className="text-base text-red-600">{passwordError}</div>
                        </label>
                        <button
                            type="submit"
                            className="text-white w-full bg-blue-500 border-0 py-2 px-8 focus:outline-none hover:bg-blue-600 rounded text-lg"
                        >
                            Sign Up
                        </button>
                    </form>
                    <div className="text-sm text-gray-500 mt-3">
                        Dont have an account? <Link to='/login' className="text-blue-500">
                            Log In
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

export default SignUp;
