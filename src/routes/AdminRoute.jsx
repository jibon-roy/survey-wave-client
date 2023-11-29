import { Navigate, useLocation } from "react-router-dom";
import { Placeholder } from "semantic-ui-react";
import useAuthProvider from "../hooks/useAuthProvider";
import useRole from "../hooks/useRole";


const AdminRoute = ({ children }) => {
    const { loading, user } = useAuthProvider();
    const [role] = useRole()
    const location = useLocation()
    console.log(role)

    if (loading)
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

    if (!user && !role === 'admin') {
        return <Navigate to='/signUp' state={location?.state} replace></Navigate>
    } else {
        return children
    }
};

export default AdminRoute;