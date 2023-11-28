import { Link } from "react-router-dom";
import Cards from "../../../components/Cards/Cards";
import PrimaryBtn from "../../../components/PrimaryBtn/PrimaryBtn";
import CustomHeader from "../../../components/customHeader/CustomHeader";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import CardPlaceHolder from "../../../components/cardPlaceHolder/CardPlaceHolder";


const LatestSurveys = () => {

    const axiosPublic = useAxiosPublic();
    const { data, isLoading } = useQuery({
        queryKey: ['surveys'],
        queryFn: async () => {
            const res = await axiosPublic.get('/surveys');
            return res.data;
        }
    })


    return (
        <section className="bg-primary-bg2 body-font">
            <div className="container px-5 py-24 mx-auto">
                <CustomHeader name='Latest' subject='Most Latest Surveys'>
                    Stay in the know with our &#39;Most Latest Surveys&#39; feature. Explore the freshest insights as
                    users actively contribute to evolving discussions. From cutting-edge products to trending topics,
                    dive into the most recent sentiments. Survey Wave keeps you connected to the pulse of current opinions,
                    shaping the conversation in real-time.
                </CustomHeader>
                {
                    isLoading ? <CardPlaceHolder></CardPlaceHolder> : <Cards data={data}></Cards>
                }
                <div className="text-center mt-10">
                    <Link to='/h' className='text-center'>
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

export default LatestSurveys;

