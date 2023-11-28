import CustomHeader from "../../../components/customHeader/CustomHeader";


const MySurvey = () => {
    return (
        <div>
            <CustomHeader name='Surveys' subject={'All Surveys Are Here'}></CustomHeader>
            <div className="w-full h-px bg-primary-text -mt-10 mb-10"></div>
            <table className="w-full text-sm text-left rtl:text-right text-primary-text dark:text-gray-400">
                <thead className="text-md text-primary-bg uppercase bg-primary-main dark:text-primary-bg">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Survey Title
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Yes Voted
                        </th>
                        <th scope="col" className="px-6 py-3">
                            No Voted
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
    );
};

export default MySurvey;