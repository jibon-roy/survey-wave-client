import Banner from "./Banner/Banner";
import Faq from "./Faq/Faq";
import FeaturedSurveys from "./Featured/FeaturedSurveys";
import HowItWorks from "./HowItWorks/HowItWorks";
import LatestSurveys from "./LatestSurveys/LatestSurveys";
import Testimonials from "./Testimonials/Testimonials";


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
            <section>
                <Testimonials></Testimonials>
            </section>
            <section>
                <Faq></Faq>
            </section>
        </>
    );
};

export default Home;