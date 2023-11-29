import { useQuery } from "@tanstack/react-query";
import CustomHeader from "../../../components/customHeader/CustomHeader";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuthProvider from "../../../hooks/useAuthProvider";
import Table from "./Table";


const MySurvey = () => {

    const axiosSecure = useAxiosSecure();
    const { user } = useAuthProvider();
    const { data, isLoading } = useQuery({
        queryKey: ['mySurvey'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/specificSurvey/${user?.email}`)
            return res.data;
        }
    })


    return (
        <div>
            <CustomHeader name='Surveys' subject={'My Surveys Are Here'}></CustomHeader>
            <div className="w-full h-px bg-primary-text -mt-10 mb-10"></div>
            {
                isLoading ? "Loading Data ..."
                    :
                    <div className="relative overflow-x-auto mb-10 shadow-md sm:rounded-lg">
                        <table className="w-full text-sm text-left rtl:text-right text-primary-text dark:text-gray-400">
                            <thead className="text-md text-primary-bg uppercase bg-primary-main dark:text-primary-bg">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        SL. Survey Title
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Response
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Likes
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        status
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    data?.map((survey, idx) => <Table key={survey?._id} index={idx} survey={survey}></Table>)
                                }
                            </tbody>
                        </table>
                    </div>
            }
        </div>
    );
};

export default MySurvey;