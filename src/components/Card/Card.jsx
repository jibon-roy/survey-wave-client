import { ThumbDownAltOutlined } from '@mui/icons-material';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
// import { Button } from '@mui/material';
import SmsOutlinedIcon from '@mui/icons-material/SmsOutlined';
import PrimaryBtn from '../PrimaryBtn/PrimaryBtn';
import { Link } from 'react-router-dom';
import moment from 'moment';
// import Radio from '@mui/material/Radio';
// import RadioGroup from '@mui/material/RadioGroup';
// import FormControlLabel from '@mui/material/FormControlLabel';


const Card = ({ survey }) => {
    const shortBody = survey?.body?.slice(0, 100);
    const totalTrueVote = survey?.totalTrueVote
    const totalFalseVote = survey?.totalFalseVote
    const totalVote = totalTrueVote.length + totalFalseVote.length
    const publishedDate = survey?.publishedDate;

    const parsedDate = moment(publishedDate);
    const formattedDate = parsedDate.format('DD-MM-YYYY');
    const likes = survey?.totalLike?.length
    const disLikes = survey?.totalDisLike?.length
    const totalComments = survey?.totalComments?.length


    return (
        <div>
            <div className="px-4 py-4 border-2 h-full rounded-md border-primary-text transition hover:border-primary-main border-opacity-60">
                <div className='flex justify-between flex-wrap items-center'>
                    <h2 className="text-lg sm:text-md text-primary-main font-semibold  title-font mb-2">{survey?.title}</h2>
                </div>
                <p className="leading-relaxed text-base mb-4">{shortBody} ...</p>
                <div className='flex justify-between flex-wrap items-center'>
                    <div>
                        Total Votes: <span className='font-bold'>{totalVote}</span>
                    </div>
                    <div className='text-[#737373]'>Published: {formattedDate}</div>
                </div>

                <div className='flex flex-wrap justify-between items-center'>
                    <div className='flex gap-4'>
                        <div className='flex gap-1'>
                            <ThumbUpOutlinedIcon className='hover:text-primary-main cursor-pointer transition'></ThumbUpOutlinedIcon>{likes}
                        </div>
                        <div className='flex gap-1'>
                            <ThumbDownAltOutlined className='hover:text-primary-main cursor-pointer transition'></ThumbDownAltOutlined>{disLikes}
                        </div>
                        <div className='flex gap-1'>
                            <SmsOutlinedIcon className='hover:text-primary-main cursor-pointer transition'></SmsOutlinedIcon>{totalComments}
                        </div>
                    </div>
                    <div className="text-blue-500 inline-flex items-center my-2">
                        <PrimaryBtn>
                            <Link to={`/surveyDetails/${survey?._id}`} className='flex items-center'>
                                Learn More
                            </Link>
                        </PrimaryBtn>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Card;