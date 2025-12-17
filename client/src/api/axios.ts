import axios from 'axios'

const BASE =  import.meta.env.VITE_API_URL

const axiosInstance = axios.create({
    baseURL: BASE,
    withCredentials: true, 
    headers: {
        'Content-Type': 'application/json'
    }
})

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  console.log(token);
  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default axiosInstance