import axios from 'axios'

const ax = axios.create({
    baseURL: 'http://localhost:3000/api'
})

export default ax