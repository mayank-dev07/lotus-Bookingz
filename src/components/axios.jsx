import axios from "axios";

const instance = axios.create({
  baseURL: "https://a977-125-21-249-98.ngrok-free.app/hall/",
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
    if (error.response.status === 401 && !error.config._retry) {
      error.config._retry = true;
      try {
        const refreshToken = localStorage.getItem("refreshToken");
        const response = await axios.post(
          "https://a977-125-21-249-98.ngrok-free.app/hall/api/token/refresh/",
          {
            refresh: refreshToken,
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        );
        console.log(response.data);

        localStorage.setItem("accesstoken", response.data.access);

        error.config.headers.Authorization = `Bearer ${response.data.access}`;
      } catch (error) {
        console.log(error);
        console.log(error.response.status);
        if (error.response.status === 401) {
          // window.location.href = "/";
          // Back();
        }
      }
    }
    return Promise.reject(error);
  }
);

export default instance;
