import axios from 'axios'

export const api=   axios.create ({
    baseURL:"https://goutam-hire-plus.onrender.com",
    withCredentials: true
})


