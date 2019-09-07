import axios from 'axios'

// baseURL: 'http://35.197.146.213'
// baseURL: 'http://localhost:3000'

const ax = axios.create({
    baseURL: 'http://35.197.146.213'
})

export default ax