import CustomHeader from "../../../components/customHeader/CustomHeader";
import Slider from "./Slider";


const Testimonials = () => {
    return (
        <div className="mb-5">
            <CustomHeader name='Testimonials' subject='Words from Clients'></CustomHeader>
            <div className="">
                <Slider></Slider>
            </div>
        </div>
    );
};

export default Testimonials;