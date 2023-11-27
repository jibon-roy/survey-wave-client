import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';
import { useLocation } from 'react-router-dom';


// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_KEY);

export default function Payment() {

    const location = useLocation();

    const price = location.state;


    return (
        <Elements stripe={stripePromise} >
            <div className="shadow-md border-2 border-primary-main p-2 rounded-lg h-72">
                <CheckoutForm price={price} />
            </div>
        </Elements>
    );
}