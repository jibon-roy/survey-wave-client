
import { TypeAnimation } from "react-type-animation";


const Banner = () => {
    return (
        <div className="md:flex mx-auto text-center relative min-h-[60vh] justify-between items-center">
            <img src="/bg.webp" className="absolute z-0 opacity-10 w-full h-[70vh] md:h-[60vh] top-0 max-md:-top-10 left-0"></img>

            <div className="max-w-3xl mx-auto">
                <img src="./logo.png" className="w-52 mx-auto block " alt="" />
                <br />
                <p className="text-xl font-semibold text-primary-main">
                    <TypeAnimation
                        sequence={["Find Today's Survey.", 500, 'Search or Filter Surveys', 500,]}
                        style={{ fontSize: '2em' }}
                        repeat={Infinity}
                    />
                </p>
                <br />
                <p>
                    Hey, All Surveys are here. Search and filter Surveys as you need.
                    Discover a world of surveys at your fingertips! Navigate through a diverse array of topics with ease. Our intuitive search and filter options empower you to find the surveys that matter most to you. Uncover valuable insights and contribute to meaningful conversations. Explore, engage, and make your voice heard on Survey Wave!
                </p>
                <br></br>
                <div>
                </div>
            </div>


        </div>
    );
};

export default Banner;