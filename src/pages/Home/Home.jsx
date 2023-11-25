import Banner from "./Banner/Banner";
import FeaturedSurveys from "./Featured/FeaturedSurveys";
import HowItWorks from "./HowItWorks/HowItWorks";
import LatestSurveys from "./LatestSurveys/LatestSurveys";


const Home = () => {
    return (
        <>
            <section>
                <Banner></Banner>
            </section>
            <section>
                <FeaturedSurveys></FeaturedSurveys>
            </section>
            <section>
                <LatestSurveys></LatestSurveys>
            </section>
            <section>
                <HowItWorks></HowItWorks>
            </section>
        </>
    );
};

export default Home;