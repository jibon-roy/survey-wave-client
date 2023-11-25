import Banner from "./Banner/Banner";
import FeaturedSurveys from "./Featured/FeaturedSurveys";


const Home = () => {
    return (
        <>
            <section>
                <Banner></Banner>
            </section>
            <section>
                <FeaturedSurveys></FeaturedSurveys>
            </section>
        </>
    );
};

export default Home;