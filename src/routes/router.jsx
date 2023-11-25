import { createBrowserRouter } from "react-router-dom";
import HomeLayout from "../layouts/homeLayout/HomeLayout";
import Home from "../pages/Home/Home";


const router = createBrowserRouter([
    {
        path: '/',
        element: <HomeLayout></HomeLayout>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            }
        ]
    }
])

export default router;