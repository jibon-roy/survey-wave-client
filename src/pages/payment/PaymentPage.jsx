import CustomHeader from "../../components/customHeader/CustomHeader";
import Payment from "./Payment";


const PaymentPage = () => {
    return (
        <div className=" max-w-md my-20 mx-auto">
            <div className='pt-10'>
                <CustomHeader name={'Payment'} subject={'Get Pro Access'}></CustomHeader>
            </div>

            <Payment></Payment>

        </div>
    );
};

export default PaymentPage;