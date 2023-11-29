import { Link } from "react-router-dom";
import Cards from "../../../components/Cards/Cards";
import PrimaryBtn from "../../../components/PrimaryBtn/PrimaryBtn";
import CustomHeader from "../../../components/customHeader/CustomHeader";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import CardPlaceHolder from "../../../components/cardPlaceHolder/CardPlaceHolder";


const FeaturedSurveys = () => {

    const axiosPublic = useAxiosPublic();
    const { data, isLoading } = useQuery({
        queryKey: ['surveys'],
        queryFn: async () => {
            const res = await axiosPublic.get('/surveys');
            return res?.data?.slice(0, 6);
        }
    })

    const sortByMostVote = data?.sort((a, b) => (b?.totalTrueVote?.length + b?.totalFalseVote?.length) - (a?.totalTrueVote?.length + a?.totalFalseVote?.length))


    return (
        <section className="text-gray-600 body-font">
            <div className="container px-5 py-24 mx-auto">
                <CustomHeader name='Featured' subject='Most Voted Surveys'>
                    Discover the pulse of popular opinions with our &#39;Most Voted Surveys&#39; feature.
                    Engage in trending topics and witness the dynamic landscape of community perspectives.
                    From product preferences to service feedback, stay connected to influential insights.
                </CustomHeader>
                {
                    isLoading ? <CardPlaceHolder></CardPlaceHolder> : <Cards data={sortByMostVote}></Cards>
                }
                <div className="text-center mt-10">
                    <Link to='/allSurvey' className='text-center'>
                        <PrimaryBtn variant='outlined' main>
                            Explore All
                            <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-2" viewBox="0 0 24 24">
                                <path d="M5 12h14M12 5l7 7-7 7"></path>
                            </svg>
                        </PrimaryBtn>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default FeaturedSurveys;