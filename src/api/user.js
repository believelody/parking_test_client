import axios from 'axios'
import { baseUrl } from '.';

export default {
    login: (email, password) => axios.post(`${baseUrl}/users/login`, {email, password}),
    register: data => axios.post(`${baseUrl}/users/register`, data),
    fetchAllUsers: () => axios.get(`${baseUrl}/users`),
    fetchOneUser: id => axios.get(`${baseUrl}/users/${id}`),
    // createUser: data => axios.post(`${baseUrl}/users`, data),
    updateUser: (data, id) => axios.put(`${baseUrl}/users/${id}`, data),
    deleteUser: id => axios.delete(`${baseUrl}/users/${id}`)
}