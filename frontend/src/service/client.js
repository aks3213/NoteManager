import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8090',
});

export const getAPI = async (path, params) => {
    let url = `${path}`;
    if (params) {
        url = `${path}?${paramsToString(params)}`;
    }
    return await api.get(url);
}

export const deleteAPI = async (path) => {
    let url = `${path}`;
    return await api.delete(url);
}

export const postAPI = async (path, body) => {
    let url = `${path}`;
    return await api.post(url, body);
}

export const putAPI = async (path, body) => {
    let url = `${path}`;
    return await api.put(url, body);
}


const paramsToString = (params) => {
    const mappings = Object.keys(params).map((key) => `${key}=${params[key]} `);
    return mappings.join('&');
}

