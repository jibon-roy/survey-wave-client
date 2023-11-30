// import { useQuery } from "@tanstack/react-query";
// import { useQuery } from "@tanstack/react-query";
// import CardPlaceHolder from "../../../components/cardPlaceHolder/CardPlaceHolder";
import CustomHeader from "../../../components/customHeader/CustomHeader";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import UserDetails from "./UserDetails";
import { useState } from "react";
// import CardPlaceHolder from "../../../components/cardPlaceHolder/CardPlaceHolder";
import { useEffect } from "react";
// import CardPlaceHolder from "../../../components/cardPlaceHolder/CardPlaceHolder";



const Users = () => {
    const [filter, setFilter] = useState('allUsers');
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)


    const axiosSecure = useAxiosSecure();

    // const { data, isLoading, refetch } = useQuery({
    //     queryKey: ['users'],
    //     queryFn: async () => {
    //         const res = await axiosSecure.post('/allUsers', { role: filter });
    //         return res?.data;
    //     }
    // })

    useEffect(() => {
        axiosSecure.post('/allUsers', { role: filter })
            .then(res => {
                setLoading(false)
                setData(res?.data)
            })
            .catch(error => console.log(error.message))
    }, [axiosSecure, filter])

    // if (isLoading) {
    //     return <CardPlaceHolder></CardPlaceHolder>
    // }


    return (
        <div>
            <CustomHeader name={'Admin Panel'} subject={'Manage All Users'}></CustomHeader>
            <div className="w-full h-px bg-primary-text -mt-10 mb-10"></div>

            {/* {isLoading ? 'Loading Users Data ...' : */}
            <div className="relative overflow-x-auto mb-10 shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-primary-text dark:text-gray-400">
                    <thead className="text-md text-primary-bg uppercase bg-primary-main dark:text-primary-bg">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                User
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Email
                            </th>

                            <th scope="col" className="text-primary-text">
                                <span className="text-primary-bg mr-2">Filter:</span>
                                <select value={filter}
                                    onChange={(e) => {
                                        // refetch()
                                        setFilter(e.target.value)
                                    }}
                                    className="p-0 pl-1 font-medium" >
                                    <option defaultChecked value="allUsers">All Users</option>
                                    <option value="admin">Admin</option>
                                    <option value="surveyor">Surveyor</option>
                                    <option value="pro">Pro</option>
                                    <option value="user">User</option>
                                </select>
                            </th>
                            <th scope="col" className="px-6 text-right py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? <tr className="font-medium text-lg my-2 mx-2"><td>Please wait ...</td></tr> :
                            data?.map((user, index) => <UserDetails key={user?._id} user={user} index={index}></UserDetails>)
                        }
                    </tbody>
                </table>

            </div>
            {/* } */}
        </div>
    );
};

export default Users;