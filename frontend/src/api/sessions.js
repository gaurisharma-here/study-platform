import api from "./axios";

export const startSession = (roomId) =>
  api.post(`/api/sessions/start/${roomId}`);
export const endSession = (sessionId) =>
  api.post(`/api/sessions/end/${sessionId}`);
export const getActiveSession = () => api.get("/api/sessions/active");
