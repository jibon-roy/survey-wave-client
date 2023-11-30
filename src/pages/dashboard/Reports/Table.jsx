import CardPlaceHolder from "../../../components/cardPlaceHolder/CardPlaceHolder";
import MyBarChart from "./MyBarChart";
import { useState } from "react";
import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import Comments from "../../SurveyDetails/Comments";
import Rpt from "./Rpt";


const Table = ({ surveyDetail, index, isLoading }) => {
    let [isOpen, setIsOpen] = useState(false);
    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }


    if (isLoading) {
        return <CardPlaceHolder></CardPlaceHolder>
    }
    return (
        <tr className={`bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600`}>
            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                <span>{index + 1}. </span>{surveyDetail?.title}
            </td>
            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                <MyBarChart data={surveyDetail}></MyBarChart>
            </td>
            <td className="px-6 py-4">
                {surveyDetail?.publish ? <p className="text-green-500 font-semibold">Running</p> : <p className="text-red-500 font-semibold">Stopped</p>}
            </td>

            <td className="px-6 font-medium py-4">
                <button
                    type="button"
                    onClick={openModal}
                    className={'cursor-pointer font-medium text-primary-bg dark:text-primary-bg bg-primary-main mr-2 px-2 hover:underline'}
                >
                    Reports
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
                                        <div>
                                            <div className="h-64 overflow-y-auto">

                                                <div className="mx-auto text-2xl font-semibold text-center">Reports</div>
                                                <div className="w-[50%] mx-auto h-px bg-primary-text mt-2"></div>
                                                <div className="flex gap-4 items-center mt-2 justify-center">
                                                    <div className="font-semibold text-primary-main">Final Result:</div>
                                                    <div className="text-primary-text">{<div className="flex gap-2"><p className="font-semibold text-green-500">Yes: {surveyDetail?.totalTrueVote.length}</p> <p className="font-semibold text-red-500">No: {surveyDetail?.totalFalseVote.length}</p></div>}</div>
                                                </div>
                                                <div className="text-red-600 font-semibold mt-4 mr-2">Admin Report:</div>
                                                <div className="text-primary-text mb-2 mr-2">{surveyDetail?.adminComment ? surveyDetail?.adminComment : 'Nice work.'}</div>
                                                <div className="text-red-600 mt-4 font-semibold mr-2">User Report:</div>
                                                <div className="text-primary-text mb-2 mr-2">{surveyDetail?.report?.length ?
                                                    surveyDetail?.report?.map((rpt, idx) => <Rpt key={idx} rpt={rpt}></Rpt>)
                                                    : 'No reports.'}</div>
                                                <div className="text-red-600 mt-4 font-semibold mr-2">Comments:</div>
                                                <div className="text-primary-text mb-2 mr-2">{surveyDetail?.totalComments?.length ?
                                                    surveyDetail?.totalComments?.map((comment, index) => <Comments key={index} comment={comment}></Comments>)
                                                    : 'No Comments'}</div>
                                            </div>
                                            <div>
                                                <div className="flex justify-center">
                                                    <button
                                                        onClick={closeModal}
                                                        type="submit"
                                                        className="text-white w-1/2 bg-blue-500 border-0 py-2 px-8 focus:outline-none hover:bg-blue-600 rounded-lg mt-4 text-lg"
                                                    >
                                                        Okey
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
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