import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import instance from "./axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function BookForm() {
  const navigate = useNavigate();
  // console.log(
  //   new Date(new Date().setDate(new Date().getDate() + 1)).toISOString()
  // );
  const [Options, setOptions] = useState([]);

  const [hallData, sethallData] = useState({
    hall: "",
    purpose: "",
    employee_remark: "",
    participant_count: "",
    from_date: "",
    to_date: "",
    from_time: "",
    to_time: "",
  });

  const notify = (message) => {
    if (message === "Hall booked successfully !") {
      toast.success(message);
    } else {
      toast.error(message);
    }
  };

  const handleChange = (e) => {
    sethallData({
      ...hallData,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    const response = instance.get("list/");
    console.log(response);
    response
      .then(function (value) {
        console.log(value.data);
        setOptions(value.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  function book(e) {
    e.preventDefault();
    console.log(hallData);
    try {
      const response = instance.post("bookhall/", hallData);
      response
        .then((value) => {
          console.log(value);
          notify("Hall booked successfully !");
          hallData.hall = "";
          e.target.reset();
          hallData.purpose = "";
          sethallData.hall = "";
          sethallData.purpose = "";
          sethallData.employee_remark = "";
          sethallData.participant_count = "";
          sethallData.from_date = "";
          sethallData.to_date = "";
          sethallData.from_time = "";
          sethallData.to_time = "";
        })
        .catch((error) => {
          console.log(error.response.data[0]);
          notify(error.response.data[0]);
        });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className="w-full flex flex-col sm:flex-row justify-center sm:p-14 bg-[url('public/360_F_355588589_4MMBMTbudDotGpd3f2dwbWdJLDjsjsFd.jpg')] bg-cover ">
        <div className="sm:w-2/5 w-full backdrop-blur-md bg-gray-500/30 backdrop-opacity-10 shadow-lg">
          <div className="w-full h-full flex flex-col justify-center items-center">
            {/* <span className="text-white text-lg sm:text-4xl w-11/12 sm:w-1/2 text-center p-8">
              WELCOME
            </span> */}
            <span className="text-gray-300 text-lg sm:text-4xl w-11/12 sm:w-4/5 text-center">
              Book The Best Venue For Special Event
            </span>
          </div>
        </div>
        <div className="w-full sm:w-3/5 sm:p-6 p-4 bg-white backdrop-opacity-10 shadow-lg">
          <form className=" w-full " onSubmit={book}>
            <div className="border-b border-gray-300 pb-5 md:px-4">
              <div className="">
                <div className="w-full pb-5 mr-2">
                  <label
                    htmlFor="hall"
                    className="text-sm sm:font-medium sm:text-lg">
                    Hall name
                  </label>
                  <div className="mt-2">
                    <select
                      required
                      value={hallData.hall}
                      onChange={handleChange}
                      name="hall"
                      className="w-full bg-white rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-400">
                      <option value="">Choose Hall</option>
                      {Options.map((option) => (
                        <option key={option.pk} value={option.pk}>
                          {option.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="flex sm:flex-row flex-col">
                  <div className="w-full sm:w-1/2 pb-5 mr-2">
                    <label
                      htmlFor="purpose"
                      className="text-sm sm:font-medium sm:text-lg">
                      Purpose
                    </label>
                    <div className="mt-2">
                      <input
                        onChange={handleChange}
                        required
                        // value={hallData.purpose}
                        id="purpose"
                        name="purpose"
                        placeholder="Purpose to book hall"
                        className="w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-400"
                      />
                    </div>
                  </div>
                  <div className="w-full sm:w-1/2 pb-5">
                    <label
                      htmlFor="participant_count"
                      className="text-sm sm:font-medium sm:text-lg">
                      Participant count
                    </label>
                    <div className="mt-2">
                      <input
                        onChange={handleChange}
                        // value={hallData.participant_count}
                        required
                        type="number"
                        id="participant_count"
                        name="participant_count"
                        min={1}
                        placeholder="No of participants"
                        className="w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-400"
                      />
                    </div>
                  </div>
                </div>

                <div className="w-full pb-5">
                  <label
                    htmlFor="employee_remark"
                    className="text-sm sm:font-medium sm:text-lg">
                    Remark
                  </label>
                  <div className="mt-1">
                    <textarea
                      onChange={handleChange}
                      // value={hallData.employee_remark}
                      required
                      id="employee_remark"
                      name="employee_remark"
                      rows={3}
                      placeholder="Remark about the conference hall"
                      className="w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-400"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="border-b border-gray-300 pb-12 flex flex-col items-center">
              <div className="mt-10 flex flex-col sm:flex-row justify-evenly w-full">
                <div className=" w-full sm:w-2/5">
                  <label
                    htmlFor="from_date"
                    className="text-sm sm:font-medium sm:text-lg">
                    Date from
                  </label>
                  <div className="mt-2 ">
                    <input
                      onChange={handleChange}
                      // value={hallData.from_date}
                      min={new Date().toISOString().split("T")[0]}
                      required
                      type="date"
                      name="from_date"
                      id="from_date"
                      placeholder=""
                      className="flex w-full rounded-md border-0 p-2 text-gray-900 shadow-sm border-2 border-gray-300"
                    />
                  </div>
                </div>
                <div className=" w-full sm:w-2/5">
                  <label
                    htmlFor="to_date"
                    className="text-sm sm:font-medium sm:text-lg">
                    Date to
                  </label>
                  <div className="mt-2">
                    <input
                      onChange={handleChange}
                      // value={hallData.to_date}
                      min={
                        new Date(new Date().setDate(new Date().getDate() + 1))
                          .toISOString()
                          .split("T")[0]
                      }
                      required
                      type="date"
                      name="to_date"
                      id="to_date"
                      placeholder=""
                      className="flex w-full rounded-md border-0 p-2 text-gray-900 shadow-sm border-2 border-gray-300"
                    />
                  </div>
                </div>
              </div>
              <div className="mt-10 flex flex-col sm:flex-row justify-evenly w-full">
                <div className=" w-full sm:w-2/5">
                  <label
                    htmlFor="from_time"
                    className="text-sm sm:font-medium sm:text-lg">
                    Time from
                  </label>
                  <div className="mt-2">
                    <input
                      onChange={handleChange}
                      // value={hallData.from_time}
                      required
                      type="time"
                      name="from_time"
                      id="from_time"
                      placeholder=""
                      className="flex w-full rounded-md border-0 p-2 text-gray-900 shadow-sm border-2 border-gray-300"
                    />
                  </div>
                </div>
                <div className=" w-full sm:w-2/5">
                  <label
                    htmlFor="to_time"
                    className="text-sm sm:font-medium sm:text-lg">
                    Time to
                  </label>
                  <div className="mt-2">
                    <input
                      onChange={handleChange}
                      // value={hallData.to_time}
                      required
                      type="time"
                      name="to_time"
                      id="to_time"
                      placeholder=""
                      className="flex w-full rounded-md border-0 p-2 text-gray-900 shadow-sm border-2 border-gray-300"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full flex justify-center p-4">
              <button
                className="bg-indigo-800 text-white p-2 rounded-lg"
                type="submit">
                Book Hall
              </button>
            </div>
          </form>
        </div>
        <ToastContainer />
      </div>
    </>
  );
}
