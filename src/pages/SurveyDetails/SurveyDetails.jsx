import { useState } from "react";
import CustomHeader from "../../components/customHeader/CustomHeader";
import Swal from "sweetalert2";
import { ThumbDownAltOutlined } from '@mui/icons-material';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import SmsOutlinedIcon from '@mui/icons-material/SmsOutlined';

const SurveyDetails = () => {

    const [selectedOption, setSelectedOption] = useState(null);

    const handleRadioChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const handleSubmitVote = (e) => {
        e.preventDefault();
        if (selectedOption) {
            console.log(selectedOption);

        } else {
            Swal.fire({
                title: "Opps...",
                text: "You haven't selected any option.",
                icon: "warning",
                confirmButtonColor: "#009EFF",
            });
        }
    }

    return (
        <div className="my-20">
            <div>
                <CustomHeader name='Details of' subject='Survey Title'></CustomHeader>
            </div>
            <div className="md:flex mx-2 gap-4">
                <div className="my-5 mx-2 md:w-1/2">
                    <div className="font-semibold text-2xl"> Title: Post Title</div>
                    <div className="font-medium text-lg">Description:</div>
                    <div className="text-justify">
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Autem soluta dignissimos deleniti ullam sint ea alias, fugit iste accusantium nihil, aliquid explicabo vel, in nobis id iure accusamus quaerat! Veniam quo nesciunt distinctio mollitia vero numquam, iste voluptates excepturi praesentium, deserunt minima quisquam reiciendis quaerat aliquid, eveniet aperiam. Molestias voluptates numquam iure fuga in qui neque accusamus rem dolore ullam.
                    </div>
                    {/* Action bar */}
                    <div className='flex flex-wrap mt-10 justify-between items-center'>
                        <div className='flex gap-4'>
                            <div className='flex gap-1'>
                                <ThumbUpOutlinedIcon className='hover:text-primary-main cursor-pointer transition'></ThumbUpOutlinedIcon>{10}
                            </div>
                            <div className='flex gap-1'>
                                <ThumbDownAltOutlined className='hover:text-primary-main cursor-pointer transition'></ThumbDownAltOutlined>{5}
                            </div>
                            <div className='flex gap-1'>
                                <SmsOutlinedIcon className='hover:text-primary-main cursor-pointer transition'></SmsOutlinedIcon>{5}
                            </div>
                        </div>
                    </div>
                </div>
                {/* Details bar and vote */}
                <div className="w-full h-1 md:w-1 md:h-[250px] bg-primary-main"></div>
                <table className="my-5 mx-2">
                    <tbody>
                        <tr>
                            <td className="font-semibold">Posted</td>
                            <td className="font-semibold px-4">:</td>
                            <td>Poster Name</td>
                        </tr>
                        <tr>
                            <td className="font-semibold">Posted Date</td>
                            <td className="font-semibold px-4">:</td>
                            <td> 12/11/2023</td>
                        </tr>
                        <tr>
                            <td className="font-semibold">Deadline</td>
                            <td className="font-semibold px-4">:</td>
                            <td className="text-red-500">16/11/2023</td>
                        </tr>
                        <tr>
                            <td className="font-semibold align-top">Vote</td>
                            <td className="font-semibold align-top px-4">:</td>
                            <td className="align-top">
                                <form onSubmit={handleSubmitVote}>
                                    <div className="flex justify-between items-center flex-wrap gap-2">
                                        <div className="flex cursor-pointer items-center">
                                            <input onChange={handleRadioChange} id="radio-1" type="radio" value="Yes" name="Vote" className="w-4 h-4 cursor-pointer text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                            <label htmlFor="radio-1" className="ms-2 text-sm cursor-pointer font-medium text-gray-900 dark:text-gray-300">Yes</label>
                                        </div>
                                        <div className="flex items-center">
                                            <input onChange={handleRadioChange} id="radio-2" type="radio" value="No" name="Vote" className="w-4 h-4 cursor-pointer text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                            <label htmlFor="radio-2" className="ms-2 text-sm cursor-pointer font-medium text-gray-900 dark:text-gray-300">No</label>
                                        </div>
                                    </div>
                                    <button type="submit" className="text-white mt-4 text-center bg-primary-main hover:bg-blue-500 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-primary-main focus:outline-none dark:focus:ring-blue-800">Submit Vote</button>
                                </form>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            {/* Comment section */}
            <form>
                <div className="w-[95%] md:w-1/2 mt-10 mx-auto mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
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
            <p className="mx-auto text-center text-xs text-gray-500 dark:text-gray-400">Remember, contributions to this topic should follow our <a href="#" className="text-blue-600 dark:text-blue-500 hover:underline">Community Guidelines</a>.</p>
            {/* Comment Section */}
            <div className="mx-2">
                <div className="font-semibold text-2xl mt-10">Recent Comments: {0}</div>
                <div className="my-5 w-full h-1 rounded-sm bg-primary-text"></div>
            </div>
        </div>
    );
};

export default SurveyDetails;