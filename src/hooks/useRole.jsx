
import { useQuery } from "@tanstack/react-query";
import useAuthProvider from "./useAuthProvider";
import useAxiosSecure from "./useAxiosSecure";



const useRole = () => {

    const axiosSecure = useAxiosSecure();
    const { user } = useAuthProvider()

    const { data: role, isPending } = useQuery({
        queryKey: [user?.email, 'role'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/check-role/${user.email}`)
            return res.data.role
        }
    })

    return [role, isPending]
};

export default useRole;