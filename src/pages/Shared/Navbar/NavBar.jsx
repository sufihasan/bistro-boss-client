import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../provider/AuthProvider";
import { FaShoppingCart } from 'react-icons/fa';
import useCart from "../../../hooks/useCart";
import useAdmin from "../../../hooks/useAdmin";


const NavBar = () => {
    const { user, logOut } = useContext(AuthContext);
    const [isAdmin] = useAdmin();
    const [cart] = useCart();


    const handleLogout = () => {
        logOut()
            .then(() => { })
            .catch(error => console.error(error))
    }
    const navOptions = <>
        <li className=""><Link to="/">Home</Link></li>
        <li className=""><Link to="/menu">Menu</Link></li>
        <li className=""><Link to="/order/salad">Order Food</Link></li>
        <li className=""><Link to="/secret">Secret</Link></li>

        {
            user && isAdmin && <li className=""><Link to="/dashboard/adminhome">Dashboard</Link></li>
        }
        {
            user && !isAdmin && <li className=""><Link to="/dashboard/userhome">Dashboard</Link></li>
        }


        <li className="">
            <Link to="/dashboard/cart"><button className="btn">
                <FaShoppingCart></FaShoppingCart>
                <div className="badge badge-secondary">+{cart.length}</div>
            </button></Link>
        </li>

        {
            user ? <>
                {/* <li><button onClick={handleLogout} className="btn btn-ghost">Logout</button></li> */}
                <li onClick={handleLogout} className="pb-3 btn btn-ghost">LogOut</li>
                <span>{user?.displayName}</span>
            </> : <>
                <li className=""><Link to="/signup">Register</Link></li>
                <li className=""><Link to="/login">Login</Link></li>
            </>
        }



    </>
    return (
        <>

            <div className="navbar max-w-screen-xl fixed z-20  bg-green-600 md:text-white">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            {navOptions}
                        </ul>
                    </div>
                    <a className="btn btn-ghost text-xl">Bistro Boss</a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {navOptions}
                    </ul>
                </div>
                <div className="navbar-end">
                    <a className="btn">Button</a>
                </div>
            </div>

        </>
    );
};

export default NavBar;