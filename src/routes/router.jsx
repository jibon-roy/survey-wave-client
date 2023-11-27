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
import AdminRoute from "./AdminRoute";



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
                path: '/surveyDetails',
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
        element: <AdminRoute><DashboardLayout></DashboardLayout></AdminRoute>,
        children: [
            {
                path: '/dashboard',
                element: <Dashboard />
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