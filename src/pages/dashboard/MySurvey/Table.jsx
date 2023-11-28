

const Table = ({ survey, index }) => {

    const totalTrueVote = survey?.totalTrueVote?.length
    const totalFalseVote = survey?.totalFalseVote?.length
    const likes = survey?.totalLike?.length
    const disLikes = survey?.totalDisLike?.length
    const status = survey?.publish


    return (
        <tr className={`bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600`}>
            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                <span>{index + 1}. </span>{survey?.title}
            </th>
            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                Yes:<span className="text-green-500 mr-1 font-bold">  {totalTrueVote}</span> No: <span className="text-red-600 font-bold">  {totalFalseVote}</span>
            </th>
            <td className="px-6 py-4">
                Like: {likes} dis: {disLikes}
            </td>
            <td className="px-6 font-medium py-4">
                {status ? <span className="text-green-500">Running</span> : <span className="text-red-500">Rejected</span>}
            </td>
            <td className="px-6 py-4">
                {survey?.role}
            </td>
        </tr>
    );
};

export default Table;