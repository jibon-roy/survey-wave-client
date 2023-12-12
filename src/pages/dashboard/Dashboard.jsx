
import { useQuery } from "@tanstack/react-query";
import CustomHeader from "../../components/customHeader/CustomHeader";
import useAuthProvider from "../../hooks/useAuthProvider";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useRole from "../../hooks/useRole";
import MyBarChart from "./Charts/BarChart";


// import useAuthProvider from "../../../hooks/useAuthProvider";
import { useState } from "react";
import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
// import { Link } from "react-router-dom";
import Swal from "sweetalert2";




const Dashboard = () => {
    let [isOpen, setIsOpen] = useState(false);
    let [isOpen2, setIsOpen2] = useState(false);
    const axiosSecure = useAxiosSecure();
    const { user, updateUserProfileName, updateUserProfileImage } = useAuthProvider()


    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }
    function closeModal2() {
        setIsOpen2(false)
    }

    function openModal2() {
        setIsOpen2(true)
    }

    const { data } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('all-user')
            return res.data
        }
    })
    const handleChangeName = (e) => {
        e.preventDefault()
        const name = e.currentTarget.name.value;
        updateUserProfileName(name)
            .then(() => Swal.fire({
                title: "Successful",
                text: `Name has changed`,
                icon: "success"
            }).then(() => location.reload()))
            .catch(() => Swal.fire({
                title: "Opps!",
                text: `Name not changed`,
                icon: "error"
            }))
    }

    const handleChangePhoto = (e) => {
        e.preventDefault()
        const photo = e.currentTarget.photo.value;
        updateUserProfileImage(photo)
            .then(() => Swal.fire({
                title: "Successful",
                text: `Photo has changed`,
                icon: "success"
            }).then(() => location.reload()))
            .catch(() => Swal.fire({
                title: "Opps!",
                text: `Photo not changed`,
                icon: "error"
            }))
    }

    const userName = user?.displayName;
    const fullName = user?.displayName;
    const [role] = useRole()
    return (
        <div>
            <CustomHeader name={'Admin Panel'}></CustomHeader>
            <p className="text-center md:text-left -mt-16 text-2xl">
                Welcome to dashboard, <span className="font-bold">{userName}</span>
            </p>
            <div className="w-full h-px bg-primary-text mt-4 mb-10"></div>
            <div className="grid grid-cols-1 md:grid-cols-3">
                <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <div className="flex justify-end px-4 pt-4">
                        <button id="dropdownButton" data-dropdown-toggle="dropdown" className="inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5" type="button">

                        </button>
                        <div id="dropdown" className="z-10 hidden text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                            <ul className="py-2" aria-labelledby="dropdownButton">
                                <li>
                                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Edit</a>
                                </li>
                                <li>
                                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Export Data</a>
                                </li>
                                <li>
                                    <a href="#" className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Delete</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="flex flex-col items-center pb-10">
                        <img className="w-24 h-24 mb-3 rounded-full shadow-lg" src={user?.photoURL} alt="Bonnie image" />
                        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{fullName}</h5>
                        <span className="text-sm text-gray-500 dark:text-gray-400">{role}</span>
                        <div className="flex mt-4 md:mt-6">
                            <button
                                className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-primary-main rounded-lg hover:bg-blue-400 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                type="button"
                                onClick={openModal}
                            >
                                Change Name
                            </button>
                            <Transition appear show={isOpen} as={Fragment}>
                                <Dialog as="div" className="z-10" onClose={closeModal}>
                                    <Transition.Child
                                        as={Fragment}
                                        enter="ease-out duration-300"
                                        enterFrom="opacity-0"
                                        enterTo="opacity-100"
                                        leave="ease-in duration-200"
                                        leaveFrom="opacity-100"
                                        leaveTo="opacity-0"
                                    >
                                        <div className="fixed inset-0 bg-black/25" />
                                    </Transition.Child>

                                    <div className="fixed inset-0 overflow-y-auto">
                                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                                            <Transition.Child
                                                as={Fragment}
                                                enter="ease-out duration-300"
                                                enterFrom="opacity-0 scale-95"
                                                enterTo="opacity-100 scale-100"
                                                leave="ease-in duration-200"
                                                leaveFrom="opacity-100 scale-100"
                                                leaveTo="opacity-0 scale-95"
                                            >
                                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                                    <form onSubmit={handleChangeName}>
                                                        <div className="mx-auto text-2xl font-semibold text-center">Admin Action</div>
                                                        <div className="w-full h-px bg-primary-text mt-4 mb-4"></div>

                                                        <div className="text-primary-text mt-4 mb-2 mr-2">Change name:</div>
                                                        <div className="mt-2">Your name<span className="text-red-600">*</span></div>
                                                        <div className="px-4 border-2 border-primary-main py-2 bg-white rounded-lg dark:bg-gray-800">
                                                            <label htmlFor="comment" className="sr-only">Your feedback</label>
                                                            <input defaultValue={user?.displayName} id="name" name='name' className="w-full outline-none px-0 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400" placeholder='Write your name...' required></input>
                                                        </div>
                                                        <div className="flex gap-3">
                                                            <button
                                                                type="submit"
                                                                className="text-white w-1/2 bg-blue-500 border-0 py-2 px-8 focus:outline-none hover:bg-blue-600 rounded-lg mt-4 text-lg"
                                                            >
                                                                Done
                                                            </button>
                                                            <button
                                                                onClick={closeModal}
                                                                type="reset"
                                                                className="text-primary-text w-1/2 bg-primary-bg2 border-2 border-primary-main py-2 px-8 focus:outline-none hover:bg-blue-200 rounded-lg mt-4 text-lg"
                                                            >
                                                                Cancel
                                                            </button>
                                                        </div>
                                                    </form>
                                                </Dialog.Panel>
                                            </Transition.Child>
                                        </div>
                                    </div>
                                </Dialog>
                            </Transition>

                            <button
                                className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700 ms-3"
                                type="button"
                                onClick={openModal2}
                            >
                                Update Photo
                            </button>
                            <Transition appear show={isOpen2} as={Fragment}>
                                <Dialog as="div" className="z-10" onClose={closeModal2}>
                                    <Transition.Child
                                        as={Fragment}
                                        enter="ease-out duration-300"
                                        enterFrom="opacity-0"
                                        enterTo="opacity-100"
                                        leave="ease-in duration-200"
                                        leaveFrom="opacity-100"
                                        leaveTo="opacity-0"
                                    >
                                        <div className="fixed inset-0 bg-black/25" />
                                    </Transition.Child>

                                    <div className="fixed inset-0 overflow-y-auto">
                                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                                            <Transition.Child
                                                as={Fragment}
                                                enter="ease-out duration-300"
                                                enterFrom="opacity-0 scale-95"
                                                enterTo="opacity-100 scale-100"
                                                leave="ease-in duration-200"
                                                leaveFrom="opacity-100 scale-100"
                                                leaveTo="opacity-0 scale-95"
                                            >
                                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                                    <form onSubmit={handleChangePhoto}>
                                                        <div className="mx-auto text-2xl font-semibold text-center">Admin Action</div>
                                                        <div className="w-full h-px bg-primary-text mt-4 mb-4"></div>

                                                        <div className="text-primary-text mt-4 mb-2 mr-2">Change photo URL</div>
                                                        <div className="mt-2">Your Photo URL<span className="text-red-600">*</span></div>
                                                        <div className="px-4 border-2 border-primary-main py-2 bg-white rounded-lg dark:bg-gray-800">
                                                            {/* <label htmlFor="photo" className="sr-only">Your feedback</label> */}
                                                            <input defaultValue={user?.photoURL} id="photo" name='photo' className="w-full outline-none px-0 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400" placeholder='Write your name...' required></input>
                                                        </div>
                                                        <div className="flex gap-3">
                                                            <button
                                                                type="submit"
                                                                className="text-white w-1/2 bg-blue-500 border-0 py-2 px-8 focus:outline-none hover:bg-blue-600 rounded-lg mt-4 text-lg"
                                                            >
                                                                Done
                                                            </button>
                                                            <button
                                                                onClick={closeModal2}
                                                                type="reset"
                                                                className="text-primary-text w-1/2 bg-primary-bg2 border-2 border-primary-main py-2 px-8 focus:outline-none hover:bg-blue-200 rounded-lg mt-4 text-lg"
                                                            >
                                                                Cancel
                                                            </button>
                                                        </div>
                                                    </form>
                                                </Dialog.Panel>
                                            </Transition.Child>
                                        </div>
                                    </div>
                                </Dialog>
                            </Transition>

                        </div>
                    </div>
                </div>
                {role === 'admin' ?
                    <div className="w-96">
                        <MyBarChart data={data}></MyBarChart>
                    </div> : ''
                }
            </div>
        </div>
    );
};



export default Dashboard;
