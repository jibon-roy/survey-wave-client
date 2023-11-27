import { Outlet } from "react-router-dom";
// import Dashboard from "../../pages/dashboard/Dashboard";


const DashboardLayout = () => {
    return (
        <div>
            <Outlet></Outlet>
        </div>
    );
};

export default DashboardLayout;