import { useContext } from "react";
import { AuthContext } from "../utility/AuthProvider/AuthProvider";


const useAuthProvider = () => {
    const authProvider = useContext(AuthContext)
    return authProvider;
};

export default useAuthProvider;