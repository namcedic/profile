import axios from 'axios'

const BASE_PATH = 'http://localhost:3001'

const axiosInstance = axios.create({
	baseURL: `${BASE_PATH}`,
	timeout: 20000
})

export default axiosInstance
