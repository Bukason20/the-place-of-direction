import axiosInstance from "../api";

const authService = {
  login: async (identifier, password) => {
    const response = await axiosInstance.post("/auth/local", {
      identifier,
      password,
    });
    return response.data;
  },

  getMe: async (token) => {
    const response = await axiosInstance.get("/users/me", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },
};

export default authService;
