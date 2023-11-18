import axios from "axios";

const instance = axios.create({
  baseURL: "http://10.21.81.3:8000/hall/",
});

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accesstoken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    console.log(error);
    if (error.response.status === 401 && !error.config._retry) {
      error.config._retry = true;

      try {
        const refreshToken = localStorage.getItem("refreshToken");
        const response = await axios.post(baseURL + "api/token/refresh/", {
          refreshToken,
        });
        const { token } = response.data;

        localStorage.setItem("accesstoken", token);
        error.config.headers.Authorization = `Bearer ${token}`;
        return axios(error.config);
      } catch (error) {
        console.log(error);
      }
    }

    return Promise.reject(error);
  }
);

export default instance;
