import axios from 'axios'

export default (token) => {
    if (token) {
        //  Apply to every request
        axios.defaults.headers.common['Authorization'] = token;
        axios.defaults.headers.common['Content-Type'] = 'application/json';
    }
    else {
        //  Delete auth header
        delete axios.defaults.headers.common['Authorization'];
    }
}