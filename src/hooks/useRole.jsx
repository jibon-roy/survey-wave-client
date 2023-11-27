// import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useAuthProvider from "./useAuthProvider";
// import useAxiosSecure from "./useAxiosSecure";
import { useEffect, useState } from "react";


const useRole = () => {
    const [role, setRoll] = useState()
    // const axiosSecure = useAxiosSecure();
    const { user } = useAuthProvider()
    const email = user?.email;

    useEffect(() => {
        axios.post('http://localhost:5000/check-role', { email: email })
            .then(res => setRoll(res.data))
            .catch()
    }, [email])
    // console.log(email)

    // const { data, isLoading } = useQuery({
    //     queryKey: ['roll'],
    //     queryFn: async () => {
    //         const res = await axiosSecure.post('/check-roll', { email: email })
    //         return res.data
    //     }
    // })
    // if (isLoading) {
    //     return
    // }
    return role?.role
};

export default useRole;