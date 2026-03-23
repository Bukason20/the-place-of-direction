import axiosInstance from "./api";

const sermonService = {
  getAllSermons: async () => {
    const response = await axiosInstance.get("/sermons?populate=*");

    const data = await response.data;

    return response.data;
  },
};

export default sermonService;
