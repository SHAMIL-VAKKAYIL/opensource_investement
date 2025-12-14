import axios from 'axios'

const BASE =  import.meta.env.VITE_API_URL

const axiosInstance = axios.create({
    baseURL: BASE,
    withCredentials: true, 
    headers: {
        'Content-Type': 'application/json'
    }
})



export default axiosInstance