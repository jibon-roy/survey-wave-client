import Banner from "./Banner/Banner";
import FeaturedSurveys from "./Featured/FeaturedSurveys";
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
        </>
    );
};

export default Home;