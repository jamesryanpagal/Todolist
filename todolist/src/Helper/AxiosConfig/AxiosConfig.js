import axios from "axios";

const axiosConfig = axios.create({
  // baseURL: "http://localhost:9090/",
  baseURL: "https://todolist-pagal.herokuapp.com/",
});

export default axiosConfig;
