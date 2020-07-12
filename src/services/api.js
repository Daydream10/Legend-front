/* eslint-disable */
import axios from 'axios'
import Cookies from 'js-cookie'
import authHeader from './auth-header'
const header= authHeader()
console.log(header)
export default axios.create({
  baseURL: '/api',
  timeout: 5000,
  headers: header
})
