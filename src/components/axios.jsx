import axios from "axios";

const instance = axios.create({
  baseURL: "http://10.21.81.18:8000/hall/",
});
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accesstoken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    console.log(config);
    return config;
  },
  (error) => Promise.reject(error)
);

instance.interceptors.response.use(
  (response) => {
    console.log(response);
    return response;
  },
  async (error) => {
    console.log(error);
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = localStorage.getItem("refreshToken");
        const response = await instance.post("api/token/refresh/", {
          refresh: refreshToken,
        });
        console.log(response);
        localStorage.setItem("accesstoken", response.data.access);
        originalRequest.headers.Authorization = `Bearer ${response.data.access}`;
        console.log(originalRequest);
        return instance(originalRequest);
      } catch (error) {
        console.log(error);
        console.log(error.response.status);
        if (error.response.status === 401) {
          localStorage.setItem("accesstoken", "");
          localStorage.setItem("refreshToken", "");
        }
      }
    }
    return Promise.reject(error);
  }
);

export default instance;
