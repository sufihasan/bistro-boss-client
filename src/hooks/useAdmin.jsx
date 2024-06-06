import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosecure from "./useAxiosecure";


const useAdmin = () => {
    const { user, loading } = useAuth();
    const axiosSecure = useAxiosecure();

    const { data: isAdmin, isPending: isAdminLoading } = useQuery({

        queryKey: [user?.email, 'isAdmin'],
        enabled: !loading,
        queryFn: async () => {
            console.log('asking or chacking is admin', user);
            const res = await axiosSecure.get(`/users/admin/${user.email}`);
            console.log(res.data);
            // console.log(res.data);
            return res.data?.admin;
        }
    });

    return [isAdmin, isAdminLoading]
};

export default useAdmin;