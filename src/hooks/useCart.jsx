import { useQuery } from "@tanstack/react-query";
import useAxiosecure from "./useAxiosecure";
import useAuth from "./useAuth";


const useCart = () => {
    // tanstack query
    const axiosSecure = useAxiosecure();
    const { user } = useAuth();

    const { refetch, data: cart = [] } = useQuery({
        queryKey: ['cart', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/carts?email=${user.email}`)
            return res.data;
        }
    })

    return [cart, refetch];
};



export default useCart;