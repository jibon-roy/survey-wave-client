import { Navigate } from "react-router-dom";
import useAuthProvider from "../hooks/useAuthProvider";
import { Placeholder } from 'semantic-ui-react'

const PublicRouter = ({ children }) => {

    const { loading, user } = useAuthProvider();


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
        return <Navigate to='/'></Navigate>
    } else {
        return children
    }
};

export default PublicRouter;