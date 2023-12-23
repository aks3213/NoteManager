import { putAPI, postAPI, deleteAPI, getAPI } from './client';

export const getNotes = async (params) => {
    const res = await getAPI('/notes', params);
    return res.data;
}

export const deleteNote = async (id) => {
    await deleteAPI(`/notes/${id}`);
}

export const createNote = async (note) => {
    return await postAPI(`/notes`, note);
}

export const updateNote = async (updatedNote) => {
    return await putAPI(`/notes/${updatedNote.id}`, updatedNote);
}
