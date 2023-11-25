import { Outlet } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";


const HomeLayout = () => {
    return (
        <>
            <Navbar>
                <Outlet></Outlet>
            </Navbar>

        </>
    );
};

export default HomeLayout;