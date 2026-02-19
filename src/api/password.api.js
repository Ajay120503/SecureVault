import API from "./axios";

export const getPasswords = () =>
  API.get("/passwords");

export const addPassword = (data) =>
  API.post("/passwords", data);

export const deletePassword = (id) =>
  API.delete(`/passwords/${id}`);

export const importPasswords = (formData) =>
  API.post("/import", formData);
