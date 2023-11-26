import { createBrowserRouter } from "react-router-dom";
import HomeLayout from "../layouts/homeLayout/HomeLayout";
import Home from "../pages/Home/Home";
import AllSurvey from "../pages/AllSurvey/AllSurvey";
import SurveyDetails from "../pages/SurveyDetails/SurveyDetails";


const router = createBrowserRouter([
    {
        path: '/',
        element: <HomeLayout></HomeLayout>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/allSurvey',
                element: <AllSurvey></AllSurvey>
            },
            {
                path: '/SurveyDetails',
                element: <SurveyDetails></SurveyDetails>
            },
        ]
    }
])

export default router;