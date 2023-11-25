import { ThumbDownAltOutlined } from '@mui/icons-material';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
// import { Button } from '@mui/material';
import SmsOutlinedIcon from '@mui/icons-material/SmsOutlined';
import PrimaryBtn from '../PrimaryBtn/PrimaryBtn';
import { Link } from 'react-router-dom';
// import Radio from '@mui/material/Radio';
// import RadioGroup from '@mui/material/RadioGroup';
// import FormControlLabel from '@mui/material/FormControlLabel';


const Card = () => {
    return (
        <div>
            <div className="px-8 py-6 border-2 h-full rounded-md border-primary-text transition hover:border-primary-main border-opacity-60">
                <div className='flex justify-between flex-wrap items-center'>
                    <h2 className="text-lg sm:text-xl text-primary-main font-medium title-font mb-2">Shooting Stars</h2>
                    <div className='text-[#737373]'>Published: 12/06/2023</div>
                </div>
                <p className="leading-relaxed text-base mb-4">Fingerstache flexitarian street art 8-bit waistcoat. Distillery hexagon disrupt edison bulbche.</p>
                {/* <div>
                    <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                    >
                        <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                        <FormControlLabel value="No" control={<Radio />} label="No" />
                    </RadioGroup>
                </div> */}
                <div className='flex flex-wrap justify-between items-center'>
                    <div className='flex gap-4'>
                        <div className='flex gap-1'>
                            <ThumbUpOutlinedIcon className='hover:text-primary-main transition'></ThumbUpOutlinedIcon>{10}
                        </div>
                        <div className='flex gap-1'>
                            <ThumbDownAltOutlined className='hover:text-primary-main transition'></ThumbDownAltOutlined>{5}
                        </div>
                        <div className='flex gap-1'>
                            <SmsOutlinedIcon className='hover:text-primary-main transition'></SmsOutlinedIcon>{5}
                        </div>
                    </div>
                    <div className="text-blue-500 inline-flex items-center my-2">
                        <PrimaryBtn>
                            <Link to='/h' className='flex items-center'>
                                Learn More
                                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-2" viewBox="0 0 24 24">
                                    <path d="M5 12h14M12 5l7 7-7 7"></path>
                                </svg>
                            </Link>
                        </PrimaryBtn>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Card;