import axios from 'axios'

const publicAxios = axios.create({
    baseURL: '/api',
})

export default publicAxios
