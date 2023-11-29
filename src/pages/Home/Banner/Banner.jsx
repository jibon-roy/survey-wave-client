import { Button } from "@mui/material";
import moment from "moment/moment";
import { Link } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";



const Banner = () => {
    return (
        <div>
            <div className="md:flex relative min-h-[70vh] justify-between items-center">
                <img src="/bg.webp" className="absolute z-0 opacity-10 w-full h-[100vh] md:h-[70vh] top-0 max-md:-top-10 left-0"></img>
                <div className="flex md:w-[50%] pt-10 h-full items-center px-4 max-md:justify-center max-md:my-10">
                    <div >
                        <img src="./logo.png" className="w-52 max-md:mx-auto block " alt="" />
                        <br />
                        <p className="text-xl md:ml-2 font-semibold text-primary-main">
                            <TypeAnimation
                                sequence={["Start Today's Survey.", 500, 'Made Your Survey Journey', 500,]}
                                style={{ fontSize: '2em' }}
                                repeat={Infinity}
                            />
                        </p>
                        <br />
                        <div className="font-bold md:ml-2 text-xl">
                            {'Today: ' +
                                moment().utcOffset(0, true).format("MMMM DD YYYY")
                            }
                        </div>
                        <p className="md:ml-2">
                            Survey Wave is your go-to platform for seamless and insightful surveys. Empower your decision-making with user-friendly surveys, real-time analytics, and customizable features for a comprehensive data-driven experience.
                        </p>
                        <br></br>
                        <Link to='/allSurvey'>
                            <Button color='primary' variant="contained" size="large" sx={{ color: "white", fontWeight: 'medium', marginLeft: '8px' }}>
                                Explore more
                            </Button>
                        </Link>
                    </div>
                </div>
                <div className="mx-auto text-center z-20">
                    <img
                        style={{ borderRadius: '30px 30px 130px 30px', textAlign: 'center', margin: '40px auto' }}
                        src="/survey.jpg"
                        className="px-2 z-20"
                        alt="" />
                </div>
            </div>
        </div>
    );
};

export default Banner;