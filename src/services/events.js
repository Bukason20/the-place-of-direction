import axiosInstance from "./api";

const eventService = {
  getAllSermons: async () => {
    const response = await axiosInstance.get("/events?populate=*");
    console.log(response.data);
    return response.data;
  },
};

export default eventService;
