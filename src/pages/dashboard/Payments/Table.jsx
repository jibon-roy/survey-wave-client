import CardPlaceHolder from "../../../components/cardPlaceHolder/CardPlaceHolder";


const Table = ({ userDetail, index, isLoading }) => {



    if (isLoading) {
        return <CardPlaceHolder></CardPlaceHolder>
    }
    return (
        <tr className={`bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600`}>
            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                <span>{index + 1}. </span>{userDetail?.name}
            </th>
            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                <span className="text-green-500 mr-1 font-bold">{userDetail?.role}  </span>
            </th>
            <td className="px-6 py-4">
                {userDetail?.email}
            </td>
            <td className="px-6 font-medium py-4">
                {userDetail?.TransitionID}
            </td>
            <td className="px-6 py-4">
                {userDetail?.paid}.00
            </td>
        </tr>
    );
};

export default Table;