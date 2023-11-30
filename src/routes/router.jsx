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
import Reports from "../pages/dashboard/Reports/Reports";
import Users from "../pages/dashboard/Users/Users";
import AllAdminSurveys from "../pages/dashboard/AllAdminSurveys/AllAdminSurveys";
import Payments from "../pages/dashboard/Payments/Payments";
import Error from "../pages/Error/Error";
import AdminRoute from "./AdminRoute";




const router = createBrowserRouter([
    {
        path: '/',
        element: <HomeLayout></HomeLayout>,
        errorElement: <Error></Error>,
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
        errorElement: <Error></Error>,
        element: <AdminRoute><DashboardLayout></DashboardLayout></AdminRoute>,
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
                element: <MySurvey></MySurvey>
            },
            {
                path: '/dashboard/allSurveys',
                element: <AllAdminSurveys></AllAdminSurveys>
            },
            {
                path: '/dashboard/reports',
                element: <AdminRoute><Reports></Reports></AdminRoute>
            },
            {
                path: '/dashboard/payments',
                element: <AdminRoute><Payments></Payments></AdminRoute>
            },

        ]
    },
    {
        path: '/login',
        errorElement: <Error></Error>,
        element: <PublicRouter><Login></Login></PublicRouter>
    },
    {
        path: '/signUp',
        errorElement: <Error></Error>,
        element: <PublicRouter><SignUp></SignUp></PublicRouter>
    },

])

export default router;