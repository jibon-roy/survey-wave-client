import CustomHeader from "../../../components/customHeader/CustomHeader";


const Payments = () => {
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
                                    SL. Survey Title
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Voted
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

                            }
                        </tbody>
                    </table>
                </div>
            }
        </div>

    );
};

export default Payments;