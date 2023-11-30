import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuthProvider from "./useAuthProvider";


const axiosSecure = axios.create({
    baseURL: 'https://survey-wave-server.vercel.app'
})
const useAxiosSecure = () => {

    const navigate = useNavigate();
    const { logOut } = useAuthProvider()

    axiosSecure.interceptors.request.use(config => {
        const token = localStorage.getItem('access-token');
        config.headers.authorization = `Bearer ${token}`
        return config

    }, err => {
        return Promise.reject(err)
    })
    axiosSecure.interceptors.response.use(response => {
        return response
    }, async error => {
        const status = error.response.status;
        if (status === 401 || status === 403) {
            await logOut();
            navigate('/login')
        }
        return Promise.reject(error)
    })
    return axiosSecure;
};

export default useAxiosSecure;