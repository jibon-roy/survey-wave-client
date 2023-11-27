import Swal from "sweetalert2";
import useAuthProvider from "../../../hooks/useAuthProvider";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useState } from "react";



const UserDetails = ({ user, index }) => {
    const axiosSecure = useAxiosSecure()
    const [deleteData, setDeleteData] = useState('');
    const { user: activeUser } = useAuthProvider()
    const handleDelete = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/deleteUser?userId=${user?._id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            setDeleteData('hidden')
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            })
                        }


                    })

            }
        });

    }

    return (
        <tr className={`bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 ${deleteData}`}>
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
                <button onClick={handleDelete} disabled={activeUser?.email === user?.email} className={activeUser?.email === user?.email ? "cursor-not-allowed font-medium text-red-300 dark:text-red-600" : "font-medium text-red-600 dark:text-red-600 hover:underline"}> Delete</button>

            </td>
        </tr >
    );
};

export default UserDetails;