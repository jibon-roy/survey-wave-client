import { createBrowserRouter } from "react-router-dom";
import HomeLayout from "../layouts/homeLayout/HomeLayout";
import Home from "../pages/Home/Home";
import AllSurvey from "../pages/AllSurvey/AllSurvey";
import SurveyDetails from "../pages/SurveyDetails/SurveyDetails";
import Pricing from "../pages/Pricing/Pricing";
import Login from "../pages/LogIn/Login";
import SignUp from "../pages/SignUp/SignUp";
import PublicRouter from "./PublicRouter";
import PaymentPage from "../pages/payment/PaymentPage";
import PrivetRoute from "./PrivetRoute";
import DashboardLayout from "../layouts/dashboardLayout/DashboardLayout";
import Dashboard from "../pages/dashboard/Dashboard";
import CreateSurvey from "../pages/dashboard/CreateSurvey/CreateSurvey";
import MySurvey from "../pages/dashboard/MySurvey/MySurvey";
import SurveyResponse from "../pages/dashboard/SurveyResponse/SurveyResponse";
import Reports from "../pages/dashboard/Reports/Reports";
import Users from "../pages/dashboard/Users/Users";
import UpdateSurvey from "../pages/dashboard/updateSurvey/UpdateSurvey";
import axios from "axios";


const routAxios = axios.create({
    baseURL: 'http://localhost:5000'
})

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
                path: '/surveyDetails/:id',
                loader: ({ params }) => routAxios.get(`surveys/${params.id}`),
                element: <SurveyDetails></SurveyDetails>
            },
            {
                path: '/pricing',
                element: <Pricing></Pricing>
            },
            {
                path: '/payment',
                element: <PrivetRoute><PaymentPage></PaymentPage></PrivetRoute>
            },
        ]
    },
    {
        path: '/dashboard',
        element: <DashboardLayout></DashboardLayout>,
        children: [
            {
                path: '/dashboard',
                element: <Dashboard />
            },
            {
                path: '/dashboard/users',
                element: <Users></Users>
            },
            {
                path: '/dashboard/createSurvey',
                element: <CreateSurvey></CreateSurvey>
            },
            {
                path: '/dashboard/mySurvey',
                loader: () => routAxios.get(`/surveys`),
                element: <MySurvey></MySurvey>
            },
            {
                path: '/dashboard/mySurvey/:surveyId',
                loader: ({ params }) => routAxios.get(`/surveys/${params.surveyId}`),
                element: <UpdateSurvey></UpdateSurvey>
            },
            {
                path: '/dashboard/surveyResponse',
                element: <SurveyResponse></SurveyResponse>
            },
            {
                path: '/dashboard/reports',
                element: <Reports></Reports>
            },

        ]
    },
    {
        path: '/login',
        element: <PublicRouter><Login></Login></PublicRouter>
    },
    {
        path: '/signUp',
        element: <PublicRouter><SignUp></SignUp></PublicRouter>
    },

])

export default router;