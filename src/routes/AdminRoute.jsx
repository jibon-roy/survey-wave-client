import { Navigate, useLocation } from "react-router-dom";
import { Placeholder } from "semantic-ui-react";
import useAuthProvider from "../hooks/useAuthProvider";
import useRole from "../hooks/useRole";


const AdminRoute = ({ children }) => {
    const { loading, user } = useAuthProvider();
    const [role, isPending] = useRole()
    const location = useLocation()
    console.log(role)

    if (loading || isPending)
        return <Placeholder>
            <Placeholder.Header image>
                <Placeholder.Line />
                <Placeholder.Line />
            </Placeholder.Header>
            <Placeholder.Paragraph>
                <Placeholder.Line />
                <Placeholder.Line />
                <Placeholder.Line />
                <Placeholder.Line />
            </Placeholder.Paragraph>
        </Placeholder>

    if (user && (role === 'admin' || role === 'surveyor')) {
        return children
    } else {
        return <Navigate to='/login' state={location?.state} replace></Navigate>
    }
};

export default AdminRoute;