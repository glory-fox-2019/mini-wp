import axios from 'axios'

const ax = axios.create({
  baseURL: 'http://35.226.234.152/api',
  // baseURL: 'http://localhost:3000/api',
  headers: {
    'token': localStorage.getItem('token')
  }
})

export default ax