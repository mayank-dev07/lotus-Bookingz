import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "./loader";

export default function Login() {
  const navigate = useNavigate();
  const [loading, setloading] = useState(true);

  useEffect(() => {
    const Auth = localStorage.getItem("accesstoken");
    if (Auth) {
      navigate("/home");
    } else {
      console.log("no change");
    }
  });

  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const notify = (message) => {
    toast.error(message);
  };

  const Submit = async (e) => {
    e.preventDefault();
    console.log(credentials);
    // const error = {};

    // if (!credentials.email) {
    //   error.email = "Please enter email";
    // } else if (
    //   !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(
    //     credentials.email
    //   )
    // ) {
    //   error.email = "Enter valid email";
    // }

    // if (!credentials.password) {
    //   error.password = "Please enter password";
    // } else if (
    //   !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
    //     credentials.password
    //   )
    // ) {
    //   error.password =
    //     "Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character.";
    // }

    // if (error.email || error.password) {
    //   console.log(error);
    // } else {
    console.log(credentials);
    try {
      const response = await axios.post(
        "http://10.21.81.18:8000/hall/api/token/",
        credentials
      );
      console.log(response.data);
      const { access, refresh } = response.data;

      localStorage.setItem("accesstoken", access);
      localStorage.setItem("refreshToken", refresh);
      setloading(false);
      navigate("/home");
      e.target.reset();
    } catch (error) {
      console.log(error);
      if (error.response.status === 401) {
        notify("Invalid user");
      } else {
        console.log("no change");
      }
    }
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="h-screen flex justify-center items-center bg-gradient-to-b from-gray-900 to-gray-600 bg-gradient-to-r">
          <div className="w-9/12 sm:h-4/5  flex sm:rounded-xl sm:shadow-xl">
            <div className="sm:w-1/2  flex justify-center text-center w-0">
              <img src="public/lotus.webp" alt="" />
            </div>
            <div className="sm:w-1/2 w-full flex justify-center items-center">
              <div className="sm:h-3/6 w-full justify-center">
                <h2 className="flex justify-center text-5xl text-red-400">
                  LOGIN
                </h2>
                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                  <form action="" onSubmit={Submit} className="space-y-6">
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm text-red-200 font-medium ">
                        Username
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          name="username"
                          id="Email"
                          value={credentials.username}
                          onChange={handleChange}
                          required
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-md ring-1 ring-red-300 p-3"
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between">
                        <label
                          htmlFor="Password"
                          className="block text-sm text-red-200 font-medium ">
                          Password
                        </label>
                      </div>
                      <div className="mt-2">
                        <input
                          type="password"
                          name="password"
                          id="Password"
                          required
                          value={credentials.password}
                          onChange={handleChange}
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-md ring-1 ring-red-300 p-3"
                        />
                      </div>
                    </div>

                    <div className="flex justify-center">
                      <button
                        type="submit"
                        className="flex w-full justify-center rounded-md bg-red-600  text-sm font-semibold px-3 py-2 text-white hover:bg-red-700 mt-5">
                        Sign in
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
