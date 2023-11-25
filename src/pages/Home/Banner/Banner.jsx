import { Button } from "@mui/material";



const Banner = () => {
    return (
        <div>
            <div className="md:flex relative min-h-[70vh] justify-between items-center">
                <img src="/bg.webp" className="absolute z-0 opacity-10 w-full h-[70vh] top-0 max-md:-top-10 left-0"></img>
                <div className="flex md:w-[50%] h-full items-center px-4 max-md:justify-center max-md:my-10">
                    <div >
                        <p className="text-2xl font-semibold">The Survey Wave</p>
                        <br />
                        <p className="text-4xl font-semibold">
                            Start Today&#39;s Survey.
                        </p>
                        <br />
                        <p>
                            Survey Wave is your go-to platform for seamless and insightful surveys. Empower your decision-making with user-friendly surveys, real-time analytics, and customizable features for a comprehensive data-driven experience.
                        </p>
                        <br></br>
                        <Button color='primary' variant="contained" size="large" sx={{ color: "white", fontWeight: 'medium' }}>
                            Explore more
                        </Button>
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