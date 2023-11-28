import { useState } from "react";
import CustomHeader from "../../../components/customHeader/CustomHeader";
import useAuthProvider from "../../../hooks/useAuthProvider";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";


const UpdateSurvey = () => {
    const axiosSecure = useAxiosSecure()
    const [category, setCategory] = useState('Education');
    const { user } = useAuthProvider();
    const email = user?.email;

    const handlePublishSurvey = (e) => {
        e.preventDefault()
        const form = e.currentTarget;
        const surveyTitle = form.title.value;
        const surveyBody = form.surveyBody.value;
        const deadline = form.deadline.value;
        const surveyData = {
            surveyor: email,
            title: surveyTitle,
            body: surveyBody,
            category: category,
            totalVote: [],
            totalLike: [],
            totalDisLike: [],
            totalComments: [],
            reportData: [],
            published: '',
            deadline: deadline
        }
        console.log(surveyData)
        axiosSecure.post('/postSurvey', surveyData)
            .then(res => {
                if (res.data) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Your Survey has been Published.",
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            })
        form.reset()

    }

    return (
        <div>
            <CustomHeader name='Update' subject={'Update Survey'}></CustomHeader>
            <div className="w-full h-px bg-primary-text -mt-10 mb-10"></div>
            <form onSubmit={handlePublishSurvey} className="max-w-md mx-auto p-4 mb-10 bg-primary-bg2 rounded-lg">
                <div className="mb-5">
                    <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Survey title:<span className="text-red-600">*</span></label>
                    <input autoComplete="on" type="text" name='title' id="title" maxLength={60} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="60 letters only" required />
                </div>
                <label htmlFor="surveyBody" autoComplete="on" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Survey:<span className="text-red-600">*</span><br /> (Make sure your answer will be Yes or No.)</label>
                <textarea id="surveyBody" name='surveyBody' rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Leave a survey..." required></textarea>
                <div className="mb-5">
                    <label htmlFor="category" className="block mb-2 mt-4 text-sm font-medium text-gray-900 dark:text-white">Select category<span className="text-red-600">*</span></label>
                    <select id="category" onChange={(e) => setCategory(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required >
                        <option value={'Education'}>Education</option>
                        <option value={'Health'}>Health</option>
                        <option value={'Technology'}>Technology</option>
                        <option value={'Entertainment'}>Entertainment</option>
                        <option value={'Travel'}>Travel</option>
                    </select>
                </div>
                <div className="mb-5">
                    <label htmlFor="deadline" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Survey deadline:<span className="text-red-600">*</span></label>
                    <input type="date" name='deadline' id="deadline" maxLength={60} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required />
                </div>

                <button type="submit" className="text-white bg-primary-main hover:bg-blue-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Publish Survey</button>
            </form>

        </div>
    );
};

export default UpdateSurvey;