import { Navigate, useLocation } from "react-router-dom";
import useAuthProvider from "../hooks/useAuthProvider";
import { Placeholder } from 'semantic-ui-react'

const PrivetRoute = ({ children }) => {
    const { loading, user } = useAuthProvider();
    const location = useLocation()

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
    if (user) {
        return children
    } else {
        return <Navigate to='/' state={location?.state} replace></Navigate>
    }
};

export default PrivetRoute;