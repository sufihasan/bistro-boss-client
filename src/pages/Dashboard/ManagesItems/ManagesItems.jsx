import { FaEdit, FaTrash } from "react-icons/fa";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import useMenu from "../../../hooks/useMenu";
import Swal from "sweetalert2";
import useAxiosecure from "../../../hooks/useAxiosecure";
import { Link } from "react-router-dom";


const ManagesItems = () => {
    const [menu, , refetch] = useMenu();
    const axiosSecure = useAxiosecure();

    const handleDeleteItem = (item) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {

                const res = await axiosSecure.delete(`/menu/${item._id}`);
                // console.log(res.data);
                if (res.data.deletedCount > 0) {
                    refetch();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${item.name} delete successful`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }

            }
        });
    }

    return (
        <div>
            <SectionTitle
                heading={'Manage all items'}
                subheading={'Hurry Up'}
            ></SectionTitle>

            <div>
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>
                                    #
                                </th>
                                <th>Image</th>
                                <th>Item Name</th>
                                <th>Price</th>
                                <th>Update</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                menu.map((item, index) => <tr key={item._id}>
                                    <th>
                                        {index + 1}
                                    </th>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    <img src={item.image} alt="Avatar Tailwind CSS Component" />
                                                </div>
                                            </div>

                                        </div>
                                    </td>
                                    <td>
                                        {item.name}
                                    </td>
                                    <td className="text-right">${item.price}</td>
                                    <th>

                                        <Link to={`/dashboard/updateItem/${item._id}`}>
                                            {/* onClick={() => handleUpdateItem(user)} */}
                                            <button className="btn btn-ghost bg-orange-400">
                                                <FaEdit className="
                                                    
                                                     text-white 
                                              "></FaEdit>
                                            </button>
                                        </Link>

                                    </th>
                                    <th>
                                        <button onClick={() => handleDeleteItem(item)}
                                            className="btn btn-ghost">
                                            <FaTrash className="
                                             text-xl
                                           text-red-600
                                          "></FaTrash></button>
                                    </th>
                                </tr>)
                            }

                        </tbody>


                    </table>
                </div>
            </div>

        </div >
    );
};

export default ManagesItems;