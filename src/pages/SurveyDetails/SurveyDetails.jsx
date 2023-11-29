import { useEffect, useState } from "react";
import CustomHeader from "../../components/customHeader/CustomHeader";
import Swal from "sweetalert2";
import { ThumbDownAltOutlined } from '@mui/icons-material';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import SmsOutlinedIcon from '@mui/icons-material/SmsOutlined';
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';
import { Link, useParams } from "react-router-dom";
import moment from "moment";
import useAuthProvider from "../../hooks/useAuthProvider";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';

const SurveyDetails = () => {
    // const data = useLoaderData()
    const params = useParams()
    const [disableLike, setDisableLike] = useState(false)
    const [disableDisLike, setDisableDisLike] = useState(false)
    const [disableVote, setDisableVote] = useState(false);
    // loader: ({ params }) => routAxios.get(`surveys/${params.id}`),

    const { user } = useAuthProvider();
    const axiosSecure = useAxiosSecure();
    const axiosPublic = useAxiosPublic();



    const { data: survey, isLoading, refetch, } = useQuery({
        queryKey: ['surveyData'],
        queryFn: async () => {
            const response = await axiosPublic.get(`/surveys/${params?.id}`); // Replace with your actual API endpoint
            return response.data;
        }
    })

    // const survey = surveyData.data;
    const posted = survey?.posted;

    const totalTrueVote = survey?.totalTrueVote
    const totalFalseVote = survey?.totalFalseVote;
    const totalVote = totalTrueVote?.length + totalFalseVote?.length
    const publishedDate = survey?.publishedDate;
    const deadlineDate = survey?.deadline;

    const parsedDate = moment(publishedDate);
    const parsedDate2 = moment(deadlineDate);
    const formattedDate = parsedDate.format('DD-MM-YYYY');
    const deadline = parsedDate2.format('DD-MM-YYYY');
    const likes = survey?.totalLike?.length
    const liker = survey?.totalLike
    const disLikes = survey?.totalDisLike?.length
    const disLiker = survey?.totalDisLike
    const totalComments = survey?.totalComments?.length;

    useEffect(() => {
        liker?.find(liked => liked === user?.email ? setDisableLike(true) : setDisableLike(false))
        disLiker?.find(disLike => disLike === user?.email ? setDisableDisLike(true) : setDisableDisLike(false))
        totalTrueVote?.find(vote => vote === user?.email ? setDisableVote(true) : setDisableVote(false))
        totalFalseVote?.find(vote => vote === user?.email ? setDisableVote(true) : setDisableVote(false))


    }, [liker, user?.email, disLiker, totalTrueVote, totalFalseVote])

    const [selectedOption, setSelectedOption] = useState(null);

    const handleRadioChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const handleSubmitVote = (e) => {
        e.preventDefault();
        if (user) {
            if (selectedOption) {
                const voteDetails = {
                    user: user?.email,
                    vote: selectedOption
                }
                axiosSecure.put(`/addVote/${survey?._id}`, voteDetails)
                    .then(res => {
                        if (res.data) {
                            refetch()
                            Swal.fire({
                                title: "Vote success.",
                                text: "Your answer has bees recorded.",
                                icon: "success",
                                confirmButtonColor: "#009EFF",
                            });
                        }
                    }).catch(err => {
                        if (err) {
                            Swal.fire({
                                title: "Opps...",
                                text: "Something is wrong. Contract with admin.",
                                icon: "warning",
                                confirmButtonColor: "#009EFF",
                            });
                        }
                    })

            } else {
                Swal.fire({
                    title: "Opps...",
                    text: "You haven't selected any option.",
                    icon: "warning",
                    confirmButtonColor: "#009EFF",
                });
            }
        } else {
            Swal.fire({
                title: "Opps...",
                text: "You need to login first.",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Okey"
            }).then((result) => {
                if (result.isConfirmed) {
                    location.href = '/login'
                }
            });
        }

    }

    const handleLike = () => {
        if (user) {
            const like = {
                user: user?.email
            }
            axiosSecure.put(`/addLike/${survey?._id}`, like)
                .then(() => refetch())

        } else {
            Swal.fire({
                title: "Opps...",
                text: "You need to login first.",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Okey"
            }).then((result) => {
                if (result.isConfirmed) {
                    location.href = '/login'
                }
            });
        }
    }
    const handleDisLike = () => {
        if (user) {
            const disLike = {
                user: user?.email
            }
            axiosSecure.put(`/disLike/${survey?._id}`, disLike)
                .then(() => refetch())

        } else {
            Swal.fire({
                title: "Opps...",
                text: "You need to login first.",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Okey"
            }).then((result) => {
                if (result.isConfirmed) {
                    location.href = '/login'
                }
            });
        }
    }

    const reportButton = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "You want to report this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#009EFF",
            confirmButtonText: "Yes, Report!"
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: "Reported!",
                    text: "Your feedback successful.",
                    confirmButtonColor: "#009EFF",
                    icon: "success"
                });
            }
        });
    }

    if (isLoading) return 'hello'

    return (
        <div className="py-28">
            <div>
                <CustomHeader name='Details page of' subject={survey?.title}></CustomHeader>
            </div>
            <div className="-mt-10 mb-10 w-full h-px rounded-sm bg-primary-text"></div>

            <div className="md:flex mx-2 gap-4">
                <div className="my-5 mx-2 md:w-1/2">
                    <div className="font-semibold text-xl mb-2"> Title: {survey?.title}</div>
                    <div className="font-medium text-lg">Description:</div>
                    <div className="text-justify">
                        {survey?.body}
                    </div>
                    {/* Action bar */}
                    <div className='flex flex-wrap mt-10 justify-between items-center'>
                        <div className='flex gap-4'>
                            <div className='flex gap-1'>
                                <button disabled={disableLike} onClick={handleLike}>{disableLike ? <ThumbUpIcon></ThumbUpIcon> : <ThumbUpOutlinedIcon className='hover:text-primary-main cursor-pointer transition'></ThumbUpOutlinedIcon>}</button>{likes}
                            </div>
                            <div className='flex gap-1'>
                                <button disabled={disableDisLike} onClick={handleDisLike}>{disableDisLike ? <ThumbDownIcon></ThumbDownIcon> : <ThumbDownAltOutlined className='hover:text-primary-main cursor-pointer transition'></ThumbDownAltOutlined>}</button>{disLikes}
                            </div>
                            <div className='flex gap-1'>
                                <SmsOutlinedIcon className='hover:text-primary-main cursor-pointer transition'></SmsOutlinedIcon>{totalComments}
                            </div>
                            <div onClick={reportButton} className='flex gap-1 hover:text-red-500 text-red-600 cursor-pointer'>
                                <ReportGmailerrorredIcon className='cursor-pointer transition'></ReportGmailerrorredIcon>Report Issue
                            </div>
                        </div>
                    </div>
                </div>
                {/* Details bar and vote */}
                <div className="w-full h-1 md:w-1 md:h-[250px] bg-primary-main"></div>

                <div>
                    <div className="mx-auto max-md:mt-5 text-center text-xl font-semibold underline">Voting Poll</div>
                    <table className="my-5 mx-2">
                        <tbody>
                            <tr>
                                <td className="font-semibold">Posted</td>
                                <td className="font-semibold px-4">:</td>
                                <td>{posted}</td>
                            </tr>
                            <tr>
                                <td className="font-semibold">Posted Date</td>
                                <td className="font-semibold px-4">:</td>
                                <td> {formattedDate}</td>
                            </tr>
                            <tr>
                                <td className="font-semibold">Deadline</td>
                                <td className="font-semibold px-4">:</td>
                                <td className="text-red-500">{deadline}</td>
                            </tr>
                            <tr>
                                <td className="font-semibold align-top">Survey Result</td>
                                <td className="font-semibold align-top px-4">:</td>
                                <td className="flex justify-between align-top">
                                    <div>Yes: {survey?.totalTrueVote?.length}</div>
                                    <div>No: {survey?.totalFalseVote?.length} </div>
                                </td>
                            </tr>
                            <tr>
                                <td className="font-semibold">Total Vote</td>
                                <td className="font-semibold px-4">:</td>
                                <td >{totalVote}</td>
                            </tr>

                            <tr>
                                <td className="font-semibold align-top">Your Vote</td>
                                <td className="font-semibold align-top px-4">:</td>
                                <td className="align-top">
                                    <form onSubmit={handleSubmitVote}>
                                        <div className="flex justify-between items-center flex-wrap gap-2">
                                            <div className="flex cursor-pointer items-center">
                                                <input disabled={disableVote} onChange={handleRadioChange} id="radio-1" type="radio" value="Yes" name="Vote" className="w-4 h-4 cursor-pointer text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                <label htmlFor="radio-1" className="ms-2 text-sm cursor-pointer font-medium text-gray-900 dark:text-gray-300">Yes</label>
                                            </div>
                                            <div className="flex items-center">
                                                <input disabled={disableVote} onChange={handleRadioChange} id="radio-2" type="radio" value="No" name="Vote" className="w-4 h-4 cursor-pointer text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                <label htmlFor="radio-2" className="ms-2 text-sm cursor-pointer font-medium text-gray-900 dark:text-gray-300">No</label>
                                            </div>
                                        </div>
                                        <button disabled={disableVote} type="submit"
                                            className={disableVote ? "text-white mt-4 text-center bg-blue-300 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-primary-main focus:outline-none dark:focus:ring-blue-800" : "text-white mt-4 text-center bg-primary-main hover:bg-blue-500 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-primary-main focus:outline-none dark:focus:ring-blue-800"}>Submit Vote</button>
                                    </form>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            {/* Comment section */}
            <form>

                <div className="w-[95%] md:w-1/2 mt-10 md:ml-4 bg-primary-bg2 max-md:mx-auto mb-4 border  dark:bg-gray-700">
                    <div className="p-2">Write a comment: (Only for pro user or, <Link to='/pricing' className="text-blue-600 font-medium">Buy Pro</Link>)</div>
                    <div className="px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800">
                        <label htmlFor="comment" className="sr-only">Your comment</label>
                        <textarea id="comment" rows="4" className="w-full px-0 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400" placeholder="Write a comment..." required></textarea>
                    </div>
                    <div className="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600">
                        <button type="submit" className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-primary-main rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-500 hover:bg-blue-500">
                            Post comment
                        </button>
                        <div className="flex ps-0 space-x-1 rtl:space-x-reverse sm:ps-2">
                            <button type="button" className="inline-flex justify-center items-center p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                                <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 12 20">
                                    <path stroke="currentColor" strokeLinejoin="round" strokeWidth="2" d="M1 6v8a5 5 0 1 0 10 0V4.5a3.5 3.5 0 1 0-7 0V13a2 2 0 0 0 4 0V6" />
                                </svg>
                                <span className="sr-only">Attach file</span>
                            </button>
                            <button type="button" className="inline-flex justify-center items-center p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                                <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 20">
                                    <path d="M8 0a7.992 7.992 0 0 0-6.583 12.535 1 1 0 0 0 .12.183l.12.146c.112.145.227.285.326.4l5.245 6.374a1 1 0 0 0 1.545-.003l5.092-6.205c.206-.222.4-.455.578-.7l.127-.155a.934.934 0 0 0 .122-.192A8.001 8.001 0 0 0 8 0Zm0 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z" />
                                </svg>
                                <span className="sr-only">Set location</span>
                            </button>
                            <button type="button" className="inline-flex justify-center items-center p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                                <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                                    <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                                </svg>
                                <span className="sr-only">Upload image</span>
                            </button>
                        </div>
                    </div>
                </div>
            </form>
            <p className="mx-auto text-center md:text-left md:pl-5 text-xs text-gray-500 dark:text-gray-400">Remember, contributions to this topic should follow our <a href="#" className="text-blue-600  hover:underline">Community Guidelines</a>.</p>
            {/* Comment Section */}
            <div className="mx-4">
                <div className="font-semibold text-xl mt-10">Recent Comments: {totalComments}</div>
                <div className="my-3 w-full h-px rounded-sm bg-primary-text"></div>
                <div>
                    <div className="mt-10">

                        <div className="flex gap-2">
                            <svg className="w-7 h-7 text-gray-700  mb-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M18 5h-.7c.229-.467.349-.98.351-1.5a3.5 3.5 0 0 0-3.5-3.5c-1.717 0-3.215 1.2-4.331 2.481C8.4.842 6.949 0 5.5 0A3.5 3.5 0 0 0 2 3.5c.003.52.123 1.033.351 1.5H2a2 2 0 0 0-2 2v3a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1V7a2 2 0 0 0-2-2ZM8.058 5H5.5a1.5 1.5 0 0 1 0-3c.9 0 2 .754 3.092 2.122-.219.337-.392.635-.534.878Zm6.1 0h-3.742c.933-1.368 2.371-3 3.739-3a1.5 1.5 0 0 1 0 3h.003ZM11 13H9v7h2v-7Zm-4 0H2v5a2 2 0 0 0 2 2h3v-7Zm6 0v7h3a2 2 0 0 0 2-2v-5h-5Z" />
                            </svg>
                            <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">Need a help in Claim?</h5>
                        </div>
                        <p className="mb-3 font-normal text-gray-700 "><span className="font-semibold">Comment:</span> Go to this step by step guideline process on how to certify for your weekly benefits:</p>
                    </div>
                    <div className="mt-10">

                        <div className="flex gap-2">
                            <svg className="w-7 h-7 text-gray-700  mb-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M18 5h-.7c.229-.467.349-.98.351-1.5a3.5 3.5 0 0 0-3.5-3.5c-1.717 0-3.215 1.2-4.331 2.481C8.4.842 6.949 0 5.5 0A3.5 3.5 0 0 0 2 3.5c.003.52.123 1.033.351 1.5H2a2 2 0 0 0-2 2v3a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1V7a2 2 0 0 0-2-2ZM8.058 5H5.5a1.5 1.5 0 0 1 0-3c.9 0 2 .754 3.092 2.122-.219.337-.392.635-.534.878Zm6.1 0h-3.742c.933-1.368 2.371-3 3.739-3a1.5 1.5 0 0 1 0 3h.003ZM11 13H9v7h2v-7Zm-4 0H2v5a2 2 0 0 0 2 2h3v-7Zm6 0v7h3a2 2 0 0 0 2-2v-5h-5Z" />
                            </svg>
                            <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">Need a help in Claim?</h5>
                        </div>
                        <p className="mb-3 font-normal text-gray-700 "><span className="font-semibold">Comment:</span> Go to this step by step guideline process on how to certify for your weekly benefits:</p>
                    </div>
                    <div className="mt-10">

                        <div className="flex gap-2">
                            <svg className="w-7 h-7 text-gray-700  mb-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M18 5h-.7c.229-.467.349-.98.351-1.5a3.5 3.5 0 0 0-3.5-3.5c-1.717 0-3.215 1.2-4.331 2.481C8.4.842 6.949 0 5.5 0A3.5 3.5 0 0 0 2 3.5c.003.52.123 1.033.351 1.5H2a2 2 0 0 0-2 2v3a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1V7a2 2 0 0 0-2-2ZM8.058 5H5.5a1.5 1.5 0 0 1 0-3c.9 0 2 .754 3.092 2.122-.219.337-.392.635-.534.878Zm6.1 0h-3.742c.933-1.368 2.371-3 3.739-3a1.5 1.5 0 0 1 0 3h.003ZM11 13H9v7h2v-7Zm-4 0H2v5a2 2 0 0 0 2 2h3v-7Zm6 0v7h3a2 2 0 0 0 2-2v-5h-5Z" />
                            </svg>
                            <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">Need a help in Claim?</h5>
                        </div>
                        <p className="mb-3 font-normal text-gray-700 "><span className="font-semibold">Comment:</span> Go to this step by step guideline process on how to certify for your weekly benefits:</p>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default SurveyDetails;