import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

axios
  .post()
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });

export default function login() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  function login(event) {
    event.preventDefault();
    const data = {
      Email: email,
      Password: password,
    };

    const error = {};

    if (!data.Email) {
      error.email = "Please enter email";
    } else if (
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(data.Email)
    ) {
      error.email = "Enter valid email";
    }

    if (!data.Password) {
      error.password = "Please enter password";
    } else if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
        data.Password
      )
    ) {
      error.password =
        "Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character.";
    }

    if (error.email || error.password) {
      console.log(error);
    } else {
      console.log(data);
      navigate("/home");
      event.reset();
    }
  }

  return (
    <>
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
                <form action="" onSubmit={login} className="space-y-6">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm text-red-200 font-medium leading-6 ">
                      Email address
                    </label>
                    <div className="mt-2">
                      <input
                        type="email"
                        name="Email"
                        id="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-md ring-1 ring-red-300 p-3"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between">
                      <label
                        htmlFor="Password"
                        className="block text-sm text-red-200 font-medium leading-6 ">
                        Password
                      </label>
                    </div>
                    <div className="mt-2">
                      <input
                        type="password"
                        name="Password"
                        id="Password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
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
    </>
  );
}
