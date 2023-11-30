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
import useRole from "../../hooks/useRole";
import CardPlaceHolder from "../../components/cardPlaceHolder/CardPlaceHolder";
import Comments from "./Comments";

const SurveyDetails = () => {
    // const data = useLoaderData()
    const [commenter, setCommenter] = useState(true)
    const [role] = useRole()
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
        if (role === 'admin') {
            setCommenter(false)
        } else if (role === 'pro') {
            setCommenter(false)
        }
        else if (role === 'surveyor') {
            setCommenter(false)
        } else {
            setCommenter(true)
        }


    }, [role, liker, user?.email, disLiker, totalTrueVote, totalFalseVote])

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

    const handleComment = (e) => {
        e.preventDefault();
        const comment = e.currentTarget.comment.value
        const userEmail = user?.email
        const userPhoto = user?.photoURL
        const userName = user?.displayName
        const obj = { comment, userName, userEmail, userPhoto }

        axiosSecure.post(`/comments/${survey?._id}`, obj)
            .then(res => {
                if (res.data) {
                    Swal.fire({
                        title: "Comment Success",
                        text: "Your comment has been submit.",
                        confirmButtonColor: "#009EFF",
                        icon: "success"
                    });
                }
            }).catch(() => {
                Swal.fire({
                    title: "Opps",
                    text: "Something is wrong",
                    confirmButtonColor: "#009EFF",
                    icon: "error"
                });
            })
        e.currentTarget.reset()
    }

    if (isLoading) return <CardPlaceHolder></CardPlaceHolder>

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
            <form onSubmit={handleComment}>

                <div className="w-[95%] md:w-1/2 mt-10 md:ml-4 bg-primary-bg2 max-md:mx-auto mb-4 border  dark:bg-gray-700">
                    <div className="p-2">Write a comment: (Only for pro user or, <Link to='/pricing' className="text-blue-600 font-medium">Buy Pro</Link>)</div>
                    <div className="px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800">
                        <label htmlFor="comment" className="sr-only">Your comment</label>
                        <textarea id="comment" name="comment" rows="4" className="w-full px-0 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400" placeholder="Write a comment..." required></textarea>
                    </div>
                    <div className="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600">
                        <button disabled={commenter} type="submit" className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-primary-main rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-500 hover:bg-blue-500">
                            Post comment
                        </button>
                    </div>
                </div>
            </form>
            <p className="mx-auto text-center md:text-left md:pl-5 text-xs text-gray-500 dark:text-gray-400">Remember, contributions to this topic should follow our <a href="#" className="text-blue-600  hover:underline">Community Guidelines</a>.</p>
            {/* Comment Section */}
            <div className="mx-4">
                <div className="font-semibold text-xl mt-10">Recent Comments: {totalComments}</div>
                <div className="my-3 w-full h-px rounded-sm bg-primary-text"></div>
                <div>
                    {
                        survey?.totalComments?.map(comment => <Comments key={comment?.userEmail} comment={comment}></Comments>)
                    }
                </div>
            </div>
        </div>
    );
};

export default SurveyDetails;