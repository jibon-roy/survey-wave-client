import Swal from "sweetalert2";
// import useAuthProvider from "../../../hooks/useAuthProvider";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useState } from "react";
import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { Link } from "react-router-dom";



const Table = ({ survey, index, refetch }) => {
    let [isOpen, setIsOpen] = useState(false);
    const axiosSecure = useAxiosSecure()
    // const { user: activeUser } = useAuthProvider()
    const [surveyStatus, setSurveyStatus] = useState()


    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }

    // Admin action
    const handleActionSubmit = (e) => {
        e.preventDefault()

        const editUser = {
            status: surveyStatus,

        }

        Swal.fire({
            title: "Are you sure?",
            text: `Make  to ${surveyStatus}`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Confirm"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.put('/changeRole', editUser)
                    .then(res => {
                        if (res.data) {
                            Swal.fire({
                                title: "Action Success",
                                text: `has changed to ${surveyStatus} `,
                                icon: "success"
                            }).then(() => refetch())
                        }
                    })
            }
        });


        // const userRoleSet = userRole

    }


    const totalTrueVote = survey?.totalTrueVote?.length
    const totalFalseVote = survey?.totalFalseVote?.length
    const likes = survey?.totalLike?.length
    const disLikes = survey?.totalDisLike?.length
    const status = survey?.publish


    return (
        <tr className={`bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600`}>
            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                <span>{index + 1}. </span>{survey?.title}
            </th>
            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                Yes:<span className="text-green-500 mr-1 font-bold">  {totalTrueVote}</span> No: <span className="text-red-600 font-bold">  {totalFalseVote}</span>
            </th>
            <td className="px-6 py-4">
                Like: {likes} dis: {disLikes}
            </td>
            <td className="px-6 font-medium py-4">
                {status ? <span className="text-green-500">Running</span> : <span className="text-red-500">Stopped</span>}
            </td>
            <td className="px-6 py-4">
                <Link to={`/surveyDetails/${survey?._id}`}>
                    <button className={"mr-2 font-medium text-primary-main dark:text-primary-main underline hover:text-blue-600 hover:underline"}> Details</button>
                </Link>
                <button
                    type="button"
                    onClick={openModal}
                    className={'cursor-pointer font-medium text-primary-bg dark:text-primary-bg bg-primary-main  px-2 hover:underline'}
                >
                    Report
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
                                        <form onSubmit={handleActionSubmit}>
                                            <div className="mx-auto text-2xl font-semibold text-center">Admin Action</div>
                                            <div className="w-full h-px bg-primary-text mt-4 mb-4"></div>

                                            <div className="text-primary-text mt-4 mb-2 mr-2">Change survey status:</div>
                                            <select id="select" name="select"
                                                value={surveyStatus} onChange={(e) => { setSurveyStatus(e.target.value) }} className=" pl-2 rounded-lg font-medium w-full border-2 border-primary-main" >
                                                <option defaultChecked value="true">Run Survey</option>
                                                <option value="false">Stop Survey</option>
                                            </select>
                                            <div className="px-4 border-2 mt-2 border-primary-main py-2 bg-white rounded-lg dark:bg-gray-800">
                                                <label htmlFor="comment" className="sr-only">Your comment</label>
                                                <textarea id="comment" rows="4" className="w-full px-0 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400" placeholder="Write a comment..." required></textarea>
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

            </td>
        </tr>
    );
};

export default Table;