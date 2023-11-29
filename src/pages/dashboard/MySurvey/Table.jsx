import Swal from "sweetalert2";
// import useAuthProvider from "../../../hooks/useAuthProvider";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useState } from "react";
import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { Link } from "react-router-dom";
import moment from "moment";

const Table = ({ survey, index, refetch }) => {
    let [isOpen, setIsOpen] = useState(false);
    const axiosSecure = useAxiosSecure()
    // const { user: activeUser } = useAuthProvider()
    const [category, setCategory] = useState(survey?.category)
    const deadlineDate = survey?.deadline;
    const parsedDate = moment(deadlineDate);
    const deadline = parsedDate.format('YYYY-MM-DD');
    const [date, setDate] = useState(deadline)


    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }


    // Admin action
    const handleActionSubmit = (e) => {
        e.preventDefault()

        const form = e.currentTarget
        const surveyTitle = form.title.value;
        const surveyBody = form.surveyBody.value;
        const deadline = form.deadline.value;
        const updateSurvey = {
            title: surveyTitle,
            body: surveyBody,
            category: category,
            deadline: deadline,
        }
        console.log(updateSurvey)
        axiosSecure.patch(`/updateSurvey/${survey?._id}`, updateSurvey)
            .then(res => {
                if (res.data) {
                    Swal.fire({
                        title: "Action Success",
                        text: `Data updated!`,
                        icon: "success"
                    }).then(() => setIsOpen(false))
                }
            }).catch(err => {
                if (err) {
                    Swal.fire({
                        title: "Opps something wrong.",
                        text: `Please contract with admin`,
                        icon: "error"
                    })
                }
            }
            )
        // const userRoleSet = userRole
    }

    const handleDelete = () => {
        Swal.fire({
            title: "Are you sure?",
            text: `Do you want to delete it?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Confirm"
        }).then((result) => {
            if (result.isConfirmed) {
                setIsOpen(false)
                axiosSecure.delete(`/deleteSurvey/${survey?._id}`)
                    .then(res => {
                        if (res.data) {
                            Swal.fire({
                                title: "Action Success",
                                text: `Survey deleted successful.`,
                                icon: "success"
                            }).then(() => { refetch() })
                        }
                    })
            }
        });
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
                    Edit
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
                                            <div className="mx-auto text-2xl font-semibold text-center">Update Survey</div>
                                            <div className="w-full h-px bg-primary-text mt-4 mb-4"></div>

                                            <div className="mb-5">
                                                <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Survey title:<span className="text-red-600">*</span></label>
                                                <input defaultValue={survey?.title} autoComplete="on" type="text" name='title' id="title" maxLength={60} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="60 letters only" required />
                                            </div>
                                            <label htmlFor="surveyBody" autoComplete="on" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Survey:<span className="text-red-600">*</span><br /> (Make sure your answer will be Yes or No.)</label>
                                            <textarea id="surveyBody" defaultValue={survey?.body} name='surveyBody' rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Leave a survey..." required></textarea>
                                            <div className="mb-5">
                                                <label htmlFor="category" className="block mb-2 mt-4 text-sm font-medium text-gray-900 dark:text-white">Select category<span className="text-red-600">*</span></label>
                                                <select id="category" value={category} onChange={(e) => setCategory(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required >
                                                    <option value={'Education'}>Education</option>
                                                    <option value={'Health'}>Health</option>
                                                    <option value={'Technology'}>Technology</option>
                                                    <option value={'Entertainment'}>Entertainment</option>
                                                    <option value={'Travel'}>Travel</option>
                                                </select>
                                            </div>
                                            <div className="mb-5">
                                                <label htmlFor="deadline" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Survey deadline:<span className="text-red-600">*</span></label>
                                                <input type="date" value={date} onChange={(e) => setDate(e.currentTarget.value)} name='deadline' id="deadline" maxLength={60} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required />
                                            </div>
                                            <div className="flex gap-3">
                                                <button
                                                    type="submit"
                                                    className="text-white w-1/3 bg-blue-500 border-0 py-2 px-8 focus:outline-none hover:bg-blue-600 rounded-lg mt-4 text-lg"
                                                >
                                                    Update
                                                </button>
                                                <button
                                                    onClick={handleDelete}
                                                    type="reset"
                                                    className="text-primary-bg w-1/3 bg-red-600 border-2 border-primary-main py-2 px-8 focus:outline-none hover:bg-red-500 rounded-lg mt-4 text-lg"
                                                >
                                                    Delete
                                                </button>
                                                <button
                                                    onClick={closeModal}
                                                    type="reset"
                                                    className="text-primary-text w-1/3 bg-primary-bg2 border-2 border-primary-main py-2 px-8 focus:outline-none hover:bg-blue-200 rounded-lg mt-4 text-lg"
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