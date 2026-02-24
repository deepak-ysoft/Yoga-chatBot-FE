import api from "./api";

export const authService = {
  login: async (email, password) => {
    const response = await api.post(
      "/auth/login",
      { email, password },
    );
    return response.data;
  },
  register: async (userData) => {
    const response = await api.post(
      "/auth/register",
      userData,
    );
    return response.data;
  },
  googleLogin: () => {
    window.location.href = `${api.defaults.baseURL}/auth/social-login`;
  },
  microsoftLogin: () => {
    window.location.href = `${api.defaults.baseURL}/auth/microsoft`;
  },
  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  },
};
