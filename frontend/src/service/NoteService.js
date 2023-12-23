import { get } from './api';

export const getNotes = async (params) => {
    const res = await get('/notes', params);
    return res.data;
}
