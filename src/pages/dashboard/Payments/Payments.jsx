import { useQuery } from "@tanstack/react-query";
import CustomHeader from "../../../components/customHeader/CustomHeader";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Table from "./Table";



const Payments = () => {


    const axiosSecure = useAxiosSecure();
    // const { user } = useAuthProvider();
    const { data, isLoading, refetch, isPending } = useQuery({
        queryKey: ['paidUsers'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/getPaidUsers`)
            return res.data;
        }
    })


    const totalBalance = data?.reduce((sum, user) => sum + user?.paid, 0)

    return (
        <div>
            <CustomHeader name='Payments' subject={'Lists of Payments'}></CustomHeader>
            <div className="w-full h-px bg-primary-text -mt-10 mb-10"></div>
            {

                <div className="relative overflow-x-auto mb-10 shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left rtl:text-right text-primary-text dark:text-gray-400">
                        <thead className="text-md text-primary-bg uppercase bg-primary-main dark:text-primary-bg">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    SL. User Name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    User Type
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Email
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Transition ID
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    $ Paid
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {isPending ? <p className="font-medium text-lg my-2 mx-2">Please wait ...</p> :

                                data?.map((userDetail, idx) => <Table key={userDetail?._id} userDetail={userDetail} index={idx} refetch={refetch} isLoading={isLoading}></Table>)
                            }
                        </tbody>
                        <tfoot className="text-md text-primary-text font-semibold uppercase bg-primary-bg2 dark:text-primary-bg">
                            <tr>
                                <td scope="col" className="px-6 py-3">Total Balance =</td>
                                <td scope="col" className="px-6 py-3"></td>
                                <td scope="col" className="px-6 py-3"></td>
                                <td scope="col" className="px-6 py-3"></td>
                                <td scope="col" className="px-6 py-3">{totalBalance}.00</td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            }
        </div>

    );
};

export default Payments;