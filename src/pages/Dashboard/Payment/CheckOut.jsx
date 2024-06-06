import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosecure from '../../../hooks/useAxiosecure';
import useCart from '../../../hooks/useCart';
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";


const CheckOut = () => {
    const [error, setError] = useState('');
    const [clientSecret, setClientSecret] = useState('');
    const [transactionId, setTransactionId] = useState('');

    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosecure();
    const { user } = useAuth();
    const [cart, refetch] = useCart();
    const navigate = useNavigate();

    const totalPrice = cart.reduce((total, item) => total + item.price, 0);

    useEffect(() => {
        if (totalPrice > 0) {
            axiosSecure.post('/create-payment-intent', { price: totalPrice })
                .then(res => {
                    console.log(res.data.clientSecret);
                    setClientSecret(res.data.clientSecret);
                })
        }
    }, [axiosSecure, totalPrice])

    //handle submit start

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);

        if (card === null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            console.log('payment error', error);
            setError(error.message);
        }
        else {
            console.log('payment methode', paymentMethod);
            setError('');
        }

        // confirm payment
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || 'anonymous',
                    name: user?.displayName || 'anonymous'
                }
            }
        })

        if (confirmError) {
            console.log('confirm Error')
        }
        else {
            console.log('payment Intent', paymentIntent)
            if (paymentIntent.status === 'succeeded') {
                console.log('transaction id', paymentIntent.id);
                setTransactionId(paymentIntent.id);

                //now save the payment in the database
                const payment = {
                    user: user.email,
                    price: totalPrice,
                    transactionId: paymentIntent.id,
                    date: new Date(), //utc date convert use moment js
                    cartIds: cart.map(item => item._id),
                    menuItemIds: cart.map(item => item.menuId),
                    status: 'pending'

                }

                const res = await axiosSecure.post('/payments', payment);
                console.log('payment save', res.data);
                refetch();

                if (res.data?.paymentResult?.insertedId) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Thank you for the taka poisa",
                        showConfirmButton: false,
                        timer: 1500
                    });

                    navigate('/dashboard/paymentHistory');
                }




            }
        }


    }

    //handle submit end

    return (
        <form onSubmit={handleSubmit}>

            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />
            <button className="btn btn-primary my-4" type="submit"
                disabled={!stripe || !clientSecret}>
                Pay
            </button>

            <p className="text-red-600">{error}</p>
            {transactionId && <p className="text-green-600">Your Transaction Id is : {transactionId}</p>}

        </form>
    );
};

export default CheckOut;