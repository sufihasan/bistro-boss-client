import {
    FaBook, FaCalendar, FaEnvelope, FaHome, FaList, FaSearch,
    FaShoppingCart, FaStreetView, FaUser, FaUtensils
} from "react-icons/fa";
import { FaMoneyBill } from "react-icons/fa6";
import { NavLink, Outlet } from "react-router-dom";
import useCart from "../hooks/useCart";
import useAdmin from "../hooks/useAdmin";

const Dashboard = () => {
    const [cart] = useCart();
    //todo:get isadmin value from the database
    const [isAdmin] = useAdmin();
    return (
        <div className="flex my-2">

            <div className="w-64 min-h-screen bg-orange-500">
                <ul className="menu p-2">

                    {
                        isAdmin ? <>

                            <li><NavLink to="/dashboard/adminhome">
                                <FaHome></FaHome>Admin Home</NavLink>
                            </li>
                            <li><NavLink to="/dashboard/additems">
                                <FaUtensils></FaUtensils>Add Items</NavLink>
                            </li>
                            <li><NavLink to="/dashboard/manageitems">
                                <FaList></FaList>Manage Items</NavLink>
                            </li>
                            <li><NavLink to="/dashboard/bookings">
                                <FaBook></FaBook>Manage Bookings</NavLink>
                            </li>
                            <li><NavLink to="/dashboard/users">
                                <FaUser></FaUser>All User</NavLink>
                            </li>

                        </> :
                            <>
                                <li><NavLink to="/dashboard/userhome">
                                    <FaHome></FaHome>User Home</NavLink>
                                </li>
                                <li><NavLink to="/dashboard/history">
                                    <FaCalendar></FaCalendar>Payment History</NavLink>
                                </li>
                                <li><NavLink to="/dashboard/cart">
                                    <FaShoppingCart></FaShoppingCart>My Cart ({cart.length})</NavLink>
                                </li>
                                <li><NavLink to="/dashboard/review">
                                    <FaStreetView></FaStreetView>Add Review</NavLink>
                                </li>
                                <li><NavLink to="/dashboard/paymentHistory">
                                    <FaBook></FaBook>Payment Real History</NavLink>
                                </li>
                                <li><NavLink to="/dashboard/payment">
                                    <FaMoneyBill></FaMoneyBill>My Payment</NavLink>
                                </li>
                            </>
                    }



                    {/* share navlinks for both admin and user */}
                    <hr className="w-3/4  mx-auto" />

                    <li><NavLink to="/">
                        <FaHome></FaHome>Home</NavLink>
                    </li>
                    <li><NavLink to="/order/salad">
                        <FaSearch></FaSearch>Menu</NavLink>
                    </li>
                    <li><NavLink to="/order/contact">
                        <FaEnvelope></FaEnvelope>Contact</NavLink>
                    </li>
                </ul>


            </div>

            <div className="flex-1 pl-8">
                <Outlet></Outlet>
            </div>

        </div>


    );
};

export default Dashboard;