import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAuthProvider from "../../hooks/useAuthProvider";




const CheckoutForm = ({ price }) => {

    const { user } = useAuthProvider()
    const [success, setSuccess] = useState('')
    const [error, setError] = useState('');
    const [clientSecret, setClientSecret] = useState('');
    const stripe = useStripe();
    const elements = useElements();
    const axiosPublic = useAxiosPublic();
    const amount = parseFloat(price);


    useEffect(() => {
        axiosPublic.post('/create-payment-intent', { amount: amount })
            .then(res => {
                setClientSecret(res.data.paymentIntent)
            })
            .catch()
    }, [axiosPublic, amount])

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement)
        if (card == null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })

        if (error) {
            setError(error.message)
            Swal.fire({
                text: error.message,
                title: 'Payment Error.',
                icon: 'error',
                confirmButtonColor: '#009EFF'
            })
        } else {
            if (paymentMethod)
                setError('');
        }
        // Card Payment
        const { paymentIntent, error: paymentError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    name: user?.displayName || 'unknown',
                    email: user?.email || 'unknown'
                }
            }
        })

        if (paymentError) {
            setError(paymentError.message)
        } else {

            if (paymentIntent.status == 'succeeded') {
                setSuccess(`Transition ID: ${paymentIntent.id}`)

                const data = {
                    name: user?.displayName,
                    email: user?.email,
                    role: 'pro',
                }

                axiosPublic.patch('/buyPro', data)
                    .then(res => {
                        if (res.data) {
                            Swal.fire({
                                title: 'Payment Successful.',
                                icon: 'success',
                                confirmButtonColor: '#009EFF'
                            })
                        }
                    })
            }
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="text-3xl font-semibold my-4">#Invoice: ${amount}</div>
            <div className="my-4">Get {amount <= 38 ? 'Pro' : 'Special'} access.</div>
            <CardElement className="border-2 border-gray-300 rounded-md p-4 "
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#303030',
                            border: '2px solid',
                            '::placeholder': {
                                color: '#080808',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />
            <button disabled={!stripe || !clientSecret} className="px-5 py-2 w-full mt-5 bg-primary-main text-white rounded-lg" type="submit">
                Pay
            </button>
            <p className="text-red-500 mt-2">{error}</p>
            <p className="text-green-500 mt-2">{success}</p>
        </form>
    );
};

export default CheckoutForm;