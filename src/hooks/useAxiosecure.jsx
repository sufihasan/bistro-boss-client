import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from './useAuth';
import { useEffect } from "react";
// import { useEffect } from "react";
const axiosSecure = axios.create({
    baseURL: 'https://bistro-boss-server-virid-seven.vercel.app'
})
const useAxiosecure = () => {
    const navigate = useNavigate();
    const { logOut } = useAuth();

    useEffect(() => {
        //request iteceptor to add authentication header for every secure call to the api
        axiosSecure.interceptors.request.use(function (config) {
            const token = localStorage.getItem('access-token');
            console.log('request stop by interceptor', token);

            config.headers.Authorization = `Bearer ${token}`;

            return config;

        }, function (error) {

            return Promise.reject(error);
        });

        // Add a response interceptor
        axiosSecure.interceptors.response.use(function (response) {
            return response;
        }, async (error) => {
            const status = error.response.status;
            console.log('status error in the interceptor', status)

            // for 401 and 403 logout the user and move the user to the login

            if (status === 401 || status === 403) {
                await logOut(); // i add await
                navigate('/login');
            }

            return Promise.reject(error);
        });


    }, [logOut, navigate])


    // //request iteceptor to add authentication header for every secure call to the api
    // axiosSecure.interceptors.request.use(function (config) {
    //     const token = localStorage.getItem('access-token');
    //     console.log('request stop by interceptor', token);

    //     config.headers.Authorization = `Bearer ${token}`;

    //     return config;

    // }, function (error) {

    //     return Promise.reject(error);
    // });

    // // Add a response interceptor
    // axiosSecure.interceptors.response.use(function (response) {
    //     return response;
    // }, async (error) => {
    //     const status = error.response.status;
    //     console.log('status error in the interceptor', status)

    //     // for 401 and 403 logout the user and move the user to the login

    //     if (status === 401 || status === 403) {
    //         await logOut();
    //         navigate('/login');
    //     }

    //     return Promise.reject(error);
    // });

    return axiosSecure;
};

export default useAxiosecure;