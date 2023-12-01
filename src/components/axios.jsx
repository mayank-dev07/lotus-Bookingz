import axios from "axios";

const instance = axios.create({
  baseURL: "http://10.21.83.60:8000/hall/",
});

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accesstoken");
    if (token) {
      // dispatch(loadingAction(true));
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

instance.interceptors.response.use(
  (response) => {
    // dispatch(loadingAction(false));
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
        const response = await axios.post(
          "http://10.21.83.60:8000/hall/api/token/refresh/",
          {
            refresh: refreshToken,
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        );
        console.log(response);
        localStorage.setItem("accesstoken", response.data.access);
        originalRequest.headers.Authorization = `Bearer ${response.data.access}`;
        console.log(originalRequest);
        return instance(originalRequest);
      } catch (error) {
        console.log(error);
        console.log(error.response.status);
        if (error.response.status === 401) {
          // instance.response.redirect("/");
          // <Redirect to="/" />;
          // return redirect("/");
          window.location.href = "/";
          localStorage.setItem("accesstoken", "");
          localStorage.setItem("refreshToken", "");

          // {
          //   Logout();
          // }
        }
      }
    }
    return Promise.reject(error);
  }
);

export default instance;
