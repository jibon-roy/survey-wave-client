import useAuthProvider from "../../../hooks/useAuthProvider";


const UserDetails = ({ user, index }) => {

    const { user: activeUser } = useAuthProvider()

    return (
        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            <th scope="row" className="px-6 py-4 flex gap-2 items-center font-medium text-gray-900 whitespace-nowrap dark:text-white">
                <span>{index + 1}. </span><img src={user?.image} className="w-9 h-9 rounded-full" alt="" />
            </th>
            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {user?.name}
            </th>
            <td className="px-6 py-4">
                {user?.email}
            </td>
            <td className="px-6 py-4">
                {user?.role}
            </td>
            <td className="px-6 py-4 text-right">
                <button disabled={activeUser?.email === user?.email} className={activeUser?.email === user?.email ? 'cursor-not-allowed font-medium text-primary-bg dark:text-primary-bg bg-primary-bg2 mr-2 px-2' : 'cursor-pointer font-medium text-primary-bg dark:text-primary-bg bg-primary-main mr-2 px-2 hover:underline'}>Edit</button>
                <button disabled={activeUser?.email === user?.email} className={activeUser?.email === user?.email ? "cursor-not-allowed font-medium text-red-300 dark:text-red-600" : "font-medium text-red-600 dark:text-red-600 hover:underline"}> Delete</button>
            </td>
        </tr >
    );
};

export default UserDetails;