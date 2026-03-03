import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8000/api",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Attach Bearer token automatically for every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// ─── Auth ────────────────────────────────────────────────────────────────────
export const login = (credentials) => api.post("/auth/login", credentials);
export const logout = () => api.post("/auth/logout");

// ─── Public ──────────────────────────────────────────────────────────────────
export const getHome = () => api.get("/home");
export const sendContact = (data) => api.post("/contact", data);

// ─── Profile ─────────────────────────────────────────────────────────────────
export const getProfile = () => api.get("/admin/profile");
export const upsertProfile = (data) => api.post("/admin/profile", data);

// ─── Skills ──────────────────────────────────────────────────────────────────
export const getSkills = () => api.get("/admin/skills");
export const createSkill = (data) => api.post("/admin/skills", data);
export const updateSkill = (id, data) => api.put(`/admin/skills/${id}`, data);
export const deleteSkill = (id) => api.delete(`/admin/skills/${id}`);

// ─── Projects ────────────────────────────────────────────────────────────────
export const getProjects = () => api.get("/admin/projects");
export const createProject = (data) => api.post("/admin/projects", data);
export const updateProject = (id, data) => api.put(`/admin/projects/${id}`, data);
export const deleteProject = (id) => api.delete(`/admin/projects/${id}`);

// ─── Experiences ─────────────────────────────────────────────────────────────
export const getExperiences = () => api.get("/admin/experiences");
export const createExperience = (data) => api.post("/admin/experiences", data);
export const updateExperience = (id, data) => api.put(`/admin/experiences/${id}`, data);
export const deleteExperience = (id) => api.delete(`/admin/experiences/${id}`);