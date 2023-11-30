import { useQuery } from "@tanstack/react-query";
import CustomHeader from "../../../components/customHeader/CustomHeader";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuthProvider from "../../../hooks/useAuthProvider";
import Table from "./Table";
// import MyPieChart from "./MyPieChart";


const Reports = () => {

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
        <div className="overflow-y-scroll max-h-[98vh]">
            <CustomHeader name='Reports' subject={'Your Survey Reports'}></CustomHeader>
            <div className="w-full h-px  bg-primary-text"></div>
            <div className="relative mt-5 overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-primary-text dark:text-gray-400">
                    <thead className="text-md text-primary-bg uppercase bg-primary-main dark:text-primary-bg">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                SL. Survey Title
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Statistics
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Report
                            </th>

                            <th scope="col" className="px-6 py-3">
                                Status
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading ? <tr className="font-medium text-lg mx-2">
                            <td> Please wait ...</td>
                        </tr> :
                            data?.map((surveyDetail, idx) => <Table key={surveyDetail?._id} surveyDetail={surveyDetail} index={idx} isLoading={isLoading}></Table>)
                        }
                    </tbody>
                </table>
            </div >
        </div >
    );
};

export default Reports;