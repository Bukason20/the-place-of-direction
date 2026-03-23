import axiosInstance from "./api";

const bookService = {
  getAllBooks: async () => {
    const response = await axiosInstance.get("/books?populate=*");
    return response.data;
  },
};

export default bookService;
