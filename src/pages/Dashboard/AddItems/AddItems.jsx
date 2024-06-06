import { useForm } from "react-hook-form";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { FaUtensils } from "react-icons/fa";
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import useAxiosecure from '../../../hooks/useAxiosecure';
import Swal from "sweetalert2";

const imgage_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const imgage_hosting_api = `https://api.imgbb.com/1/upload?key=${imgage_hosting_key}`;
const AddItems = () => {

    const { register, handleSubmit, reset } = useForm();
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosecure();


    const onSubmit = async (data = []) => {
        console.log(data)
        //upload to image bb and then get an url
        const imageFile = { image: data.image[0] }
        const res = await axiosPublic.post(imgage_hosting_api, imageFile, {
            headers: {
                'content-type': 'multipart/form-data',
            }
        })

        if (res.data.success) {
            const menuItem = {
                name: data.name,
                category: data.category,
                price: parseFloat(data.price),
                recipe: data.recipe,
                image: res.data.data.display_url
            }

            const menuRes = await axiosSecure.post('/menu', menuItem);
            console.log(menuRes.data);
            if (menuRes.data.insertedId) {
                // show success pop up
                reset();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${data.name} id added successfull`,
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        }


        console.log('with img url', res.data);


    }

    return (
        <div>
            <SectionTitle
                subheading={"What's new"}
                heading={'add item'}
            ></SectionTitle>

            <div>
                <form onSubmit={handleSubmit(onSubmit)}>

                    <label className="form-control w-full my-6">
                        <div className="label">
                            <span className="label-text">Recipe Name*</span>
                        </div>
                        <input
                            {...register("name", { required: true })}
                            type="text" placeholder="Enter Recipe Name" className="input input-bordered w-full " />

                    </label>

                    <div className="flex gap-6">
                        {/* category */}
                        <label className="form-control w-full my-6">
                            <div className="label">
                                <span className="label-text">Category*</span>
                            </div>

                            <select defaultValue="default" {...register("category", { required: true })}
                                className="select select-bordered w-full">
                                <option disabled value="default">Select a category</option>
                                <option value="salad">Salad</option>
                                <option value="pizza">Pizza</option>
                                <option value="soup">Soup</option>
                                <option value="dessert">Dessert</option>
                                <option value="drinks">Drinks</option>
                            </select>

                        </label>

                        {/* price */}
                        <label className="form-control w-full my-6">
                            <div className="label">
                                <span className="label-text">Price*</span>
                            </div>
                            <input
                                {...register("price", { required: true })}
                                type="number" placeholder="Enter Price"
                                className="input input-bordered w-full " />

                        </label>

                    </div>

                    {/* recipe details */}
                    <label className="form-control mb-6">
                        <div className="label">
                            <span className="label-text">Recipe Details</span>

                        </div>
                        <textarea {...register("recipe")}
                            required
                            className="textarea textarea-bordered h-24"
                            placeholder="Bio"></textarea>

                    </label>

                    <label className="form-control mb-6">
                        <input {...register("image", { required: true })} type="file"
                            className="file-input file-input-bordered w-full max-w-xs"
                        />
                    </label>


                    <button className="btn">
                        Add Item <FaUtensils className="ml-4"></FaUtensils>
                    </button>
                </form>
            </div >

        </div >
    );
};

export default AddItems;