import axios from 'axios'
import { baseUrl } from '.';

export default {
    fetchAllSpots: () => axios.get(`${baseUrl}/spots`),
    fetchOneSpot: id => axios.get(`${baseUrl}/spots/${id}`),
    createSpot: data => axios.post(`${baseUrl}/spots`),
    getFreeSpots: () => axios.get(`${baseUrl}/spots/free`),
    searchByUser: userId => axios.get(`${baseUrl}/spots/search-by-user?user=${userId}`),
    assignSpotToUser: (spotId, userId) => axios.put(`${baseUrl}/spots/${spotId}`, {userId}),
    updateSpot: (id, data) => axios.put(`${baseUrl}/spots/${id}`, data),
    deleteSpot: id => axios.delete(`${baseUrl}/spots/${id}`)
}