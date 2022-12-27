import axios, {AxiosRequestConfig, AxiosInstance} from "axios";
import dayjs from "dayjs";



export const axiosInstance: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_WEB_API_URL,
    headers: {
        "Content-Type": "application/json"

    },
    timeout: 20_000
});

axiosInstance.interceptors.request.use((request: AxiosRequestConfig) => {
    const date = dayjs(new Date()).format("DD.MM.YYYY hh:mm:ss");
    console.log(`${date}: [${request.method?.toUpperCase()}] ${request.baseURL}/${request.url}`);
    return request;
});