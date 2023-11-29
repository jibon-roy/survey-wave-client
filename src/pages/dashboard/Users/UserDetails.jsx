import Swal from "sweetalert2";
import useAuthProvider from "../../../hooks/useAuthProvider";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useState } from "react";
import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'


const UserDetails = ({ user, index }) => {
    let [isOpen, setIsOpen] = useState(false);
    const axiosSecure = useAxiosSecure()
    const [deleteData, setDeleteData] = useState('');
    const { user: activeUser } = useAuthProvider()
    const [userRole, setUserRole] = useState(user?.role)


    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }
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
    // Admin action
    const handleActionSubmit = (e) => {
        e.preventDefault()

        const editUser = {
            role: userRole,
            id: user?._id
        }

        Swal.fire({
            title: "Are you sure?",
            text: `Make ${user?.name} to ${userRole}`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Confirm"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.put('/changeRole', editUser)
                    .then(res => {
                        if (res.data) {
                            Swal.fire({
                                title: "Action Success",
                                text: `${user?.name} has changed to ${userRole} `,
                                icon: "success"
                            }).then(location.reload())
                        }
                    })
            }
        });


        // const userRoleSet = userRole

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
                <button
                    type="button"
                    onClick={openModal}
                    disabled={activeUser?.email === user?.email} className={activeUser?.email === user?.email ? 'cursor-not-allowed font-medium text-primary-bg dark:text-primary-bg bg-primary-bg2 mr-2 px-2' : 'cursor-pointer font-medium text-primary-bg dark:text-primary-bg bg-primary-main mr-2 px-2 hover:underline'}
                >
                    Edit
                </button>
                <Transition appear show={isOpen} as={Fragment}>
                    <Dialog as="div" className="z-10" onClose={closeModal}>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0 bg-black/25" />
                        </Transition.Child>

                        <div className="fixed inset-0 overflow-y-auto">
                            <div className="flex min-h-full items-center justify-center p-4 text-center">
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-out duration-300"
                                    enterFrom="opacity-0 scale-95"
                                    enterTo="opacity-100 scale-100"
                                    leave="ease-in duration-200"
                                    leaveFrom="opacity-100 scale-100"
                                    leaveTo="opacity-0 scale-95"
                                >
                                    <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                        <form onSubmit={handleActionSubmit}>
                                            <div className="mx-auto text-2xl font-semibold text-center">Admin Action</div>
                                            <div className="text-primary-text mt-4 mb-2 mr-2">Change Role:</div>
                                            <select id="select" name="select" value={userRole} onChange={(e) => { setUserRole(e.target.value) }} className=" pl-2 rounded-lg font-medium w-full border-2 border-primary-main" >
                                                <option defaultChecked value="admin">Admin</option>
                                                <option value="surveyor">Surveyor</option>
                                                <option value="pro">Pro</option>
                                                <option value="user">User</option>
                                            </select>
                                            <div className="flex gap-3">
                                                <button
                                                    type="submit"
                                                    className="text-white w-1/2 bg-blue-500 border-0 py-2 px-8 focus:outline-none hover:bg-blue-600 rounded-lg mt-4 text-lg"
                                                >
                                                    Done
                                                </button>
                                                <button
                                                    onClick={closeModal}
                                                    type="reset"
                                                    className="text-primary-text w-1/2 bg-primary-bg2 border-2 border-primary-main py-2 px-8 focus:outline-none hover:bg-blue-200 rounded-lg mt-4 text-lg"
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        </form>
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </Dialog>
                </Transition>

                <button onClick={handleDelete} disabled={activeUser?.email === user?.email} className={activeUser?.email === user?.email ? "cursor-not-allowed font-medium text-red-300 dark:text-red-600" : "font-medium text-red-600 dark:text-red-600 hover:underline"}> Delete</button>

            </td>
        </tr >
    );
};

export default UserDetails;