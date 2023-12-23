import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8090', // Replace with your backend URL
});

export const get = async (path, params) => {
    let url = `${path}`;
    if (params) {
        url = `${path}?${paramsToString(params)}`;
    }
    return await api.get(url);
}


const paramsToString = (params) => {
    const mappings = Object.keys(params).map((key) => `${key}=${params[key]} `);
    return mappings.join('&');
}

