import API from "./axios";

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

/* ================= ADMIN ================= */

export const getAdminStats = () => API.get("/admin/stats");

export const getUsers = () => API.get("/admin/users");

export const getLogs = () => API.get("/admin/logs");

export const deleteUser = async (id) => {return API.delete(`/admin/users/${id}`);};
