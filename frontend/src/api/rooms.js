import api from "./axios";

export const createRoom = (data) => api.post("/api/rooms/", data);
export const getRooms = () => api.get("/api/rooms/");
export const getRoom = (id) => api.get(`/api/rooms/${id}`);
export const joinRoom = (data) => api.post("/api/rooms/join", data);
export const deleteRoom = (id) => api.delete(`/api/rooms/${id}`);
export const getRoomMembers = (id) => api.get(`/api/rooms/${id}/members`);
export const getRoomMessages = (id) => api.get(`/api/rooms/${id}/messages`);
