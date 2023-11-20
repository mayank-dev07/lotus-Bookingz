import axios from "axios";

const instance = axios.create({
  baseURL: "http://10.21.86.132:8000/hall/",
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
          "http://10.21.86.132:8000/hall/api/token/refresh/",
          {
            refresh: refreshToken,
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        );

        console.log(response.data.access);

        localStorage.setItem("accesstoken", response.data.access);

        error.config.headers.Authorization = `Bearer ${response.data.access}`;
        return axios(error.config);
      } catch (error) {
        console.log(error);
      }
    }
    return Promise.reject(error);
  }
);

export default instance;
