import axios from 'axios'

const BASE = 'http://localhost:5000/api'

const axiosInstance = axios.create({
    baseURL: BASE,
    withCredentials: true, 
    headers: {
        'Content-Type': 'application/json'
    }
})



export default axiosInstance