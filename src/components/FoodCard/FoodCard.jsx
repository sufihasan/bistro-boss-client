import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";

import useAxiosecure from "../../hooks/useAxiosecure";
import useCart from "../../hooks/useCart";



const FoodCard = ({ item }) => {

    const { name, price, recipe, image, _id } = item;
    const { user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const axiosSecure = useAxiosecure();
    const [, refetch] = useCart();

    const handleFoodCart = () => {
        // console.log(food, user.email);
        if (user && user.email) {
            // sent to database
            // console.log(user.email);
            const cartItem = {
                menuId: _id,
                email: user.email,
                name,
                image,
                price
            }

            axiosSecure.post('/carts', cartItem)
                .then(res => {
                    console.log(res.data);
                    if (res.data.insertedId) {
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: `${name} added to the cart`,
                            showConfirmButton: false,
                            timer: 1500
                        });
                        refetch();
                    }
                })
        }
        else {
            Swal.fire({
                title: "You are not logged in",
                text: "please login to add to the cart",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, login!"
            }).then((result) => {
                if (result.isConfirmed) {
                    //send the user to the login page
                    navigate('/login', { state: { from: location } });
                }
            });
        }
    }
    return (
        <div className="card w-96 bg-base-100 shadow-xl">
            <figure><img src={image} alt="Shoes" /></figure>

            <p className="bg-slate-900 text-white 
            absolute right-0 mr-3 
            bg-opacity-50 mt-2 px-2 rounded">${price}</p>

            <div className="card-body text-center flex flex-col items-center">
                <h2 className="card-title">{name}</h2>
                <p className="">{recipe}</p>

                <div className="card-actions justify-end">
                    <button
                        onClick={handleFoodCart}
                        className="btn btn-outline
                     bg-slate-100 border-orange-400
                      border-0 border-b-4 mt-4">Add to Cart</button>
                </div>
            </div>
        </div>
    );
};

export default FoodCard;