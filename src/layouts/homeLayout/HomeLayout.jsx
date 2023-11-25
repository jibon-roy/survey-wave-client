import { Outlet } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";


const HomeLayout = () => {
    return (
        <>
            <Navbar>
                <Outlet></Outlet>
            </Navbar>
            <Footer></Footer>
        </>
    );
};

export default HomeLayout;