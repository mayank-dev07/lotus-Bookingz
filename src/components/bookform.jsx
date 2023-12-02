import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import instance from "./axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function BookForm() {
  const navigate = useNavigate();
  const [Options, setOptions] = useState([]);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  const [hallData, sethallData] = useState({
    hall: "",
    purpose: "",
    employee_remark: "",
    participant_count: "",
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
    hallData.from_date = startDate.toISOString().split("T")[0];
    hallData.to_date = endDate.toISOString().split("T")[0];
    console.log(hallData);
    try {
      const response = instance.post("bookhall/", hallData);
      response
        .then((value) => {
          console.log(value);
          notify("Hall booked successfully !");
          e.target.reset();
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
        <div className="sm:w-2/5 w-full backdrop-blur-md bg-gray-800/30 backdrop-opacity-10 shadow-lg">
          <div className="w-full h-full flex flex-col justify-center items-center">
            <span className="text-gray-300 text-lg sm:text-4xl w-11/12 sm:w-4/5 text-center">
              Book The Best Venue For Special Event
            </span>
          </div>
        </div>
        <div className="w-full sm:w-3/5 sm:p-6 p-4 backdrop-blur-sm bg-red-300/20 backdrop-opacity-90">
          <form className=" w-full " onSubmit={book}>
            <div className="border-b border-gray-500 pb-5 md:px-4">
              <div className="">
                <div className="w-full pb-5 mr-2">
                  <label
                    htmlFor="hall"
                    className="text-sm sm:font-medium sm:text-lg text-white">
                    Hall name
                  </label>
                  <div className="mt-2">
                    <select
                      value={hallData.hall}
                      onChange={handleChange}
                      name="hall"
                      className="w-full bg-red-200/20 rounded-md  p-2 text-white shadow-sm">
                      <option value="" className="bg-gray-700">
                        Choose Hall
                      </option>
                      {Options.map((option) => (
                        <option
                          key={option.pk}
                          value={option.pk}
                          className="bg-gray-700">
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
                      className="text-sm sm:font-medium sm:text-lg text-white">
                      Purpose
                    </label>
                    <div className="mt-2">
                      <input
                        onChange={handleChange}
                        id="purpose"
                        name="purpose"
                        placeholder="Purpose to book hall"
                        className="w-full rounded-md bg-red-200/20  p-2 text-white shadow-sm"
                      />
                    </div>
                  </div>
                  <div className="w-full sm:w-1/2 pb-5">
                    <label
                      htmlFor="participant_count"
                      className="text-sm sm:font-medium sm:text-lg text-white">
                      Participant count
                    </label>
                    <div className="mt-2">
                      <input
                        onChange={handleChange}
                        type="number"
                        id="participant_count"
                        name="participant_count"
                        min={1}
                        placeholder="No of participants"
                        className="w-full rounded-md bg-red-200/20  p-2 text-white shadow-sm"
                      />
                    </div>
                  </div>
                </div>

                <div className="w-full pb-5">
                  <label
                    htmlFor="employee_remark"
                    className="text-sm sm:font-medium sm:text-lg text-white">
                    Remark
                  </label>
                  <div className="mt-1">
                    <textarea
                      onChange={handleChange}
                      // value={hallData.employee_remark}

                      id="employee_remark"
                      name="employee_remark"
                      rows={3}
                      placeholder="Remark about the conference hall"
                      className="w-full rounded-md bg-red-200/20  p-2 text-white shadow-sm"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="border-b border-gray-500 pb-12 flex flex-col items-center">
              <div className="mt-10 flex flex-col sm:flex-row justify-evenly w-full">
                <div className=" w-full sm:w-2/5">
                  <label
                    htmlFor="from_date"
                    className="text-sm sm:font-medium sm:text-lg text-white">
                    Date from
                  </label>
                  <div className="mt-2 ">
                    <DatePicker
                      className="flex w-full bg-red-200/20 rounded-md  p-2 text-white shadow-sm  border-gray-200"
                      selected={startDate}
                      name="from_date"
                      onChange={(startDate) => setStartDate(startDate)}
                      minDate={new Date()}
                      placeholderText="Select a date"
                    />
                  </div>
                </div>
                <div className=" w-full sm:w-2/5">
                  <label
                    htmlFor="to_date"
                    className="text-sm sm:font-medium sm:text-lg text-white">
                    Date to
                  </label>
                  <div className="mt-2">
                    <DatePicker
                      className="flex w-full bg-red-200/20 rounded-md  p-2 text-white shadow-sm  border-gray-200"
                      selected={endDate}
                      name="from_date"
                      onChange={(endDate) => setEndDate(endDate)}
                      minDate={startDate}
                      placeholderText="Select a date"
                    />
                  </div>
                </div>
              </div>
              <div className="mt-10 flex flex-col sm:flex-row justify-evenly w-full">
                <div className=" w-full sm:w-2/5">
                  <label
                    htmlFor="from_time"
                    className="text-sm sm:font-medium sm:text-lg text-white">
                    Time from
                  </label>
                  <div className="mt-2">
                    <input
                      onChange={handleChange}
                      type="time"
                      name="from_time"
                      id="from_time"
                      placeholder=""
                      className="flex w-full bg-red-200/20 rounded-md  p-2 text-white shadow-sm  border-gray-200"
                    />
                  </div>
                </div>
                <div className=" w-full sm:w-2/5">
                  <label
                    htmlFor="to_time"
                    className="text-sm sm:font-medium sm:text-lg text-white">
                    Time to
                  </label>
                  <div className="mt-2">
                    <input
                      onChange={handleChange}
                      // value={hallData.to_time}

                      type="time"
                      name="to_time"
                      id="to_time"
                      placeholder=""
                      className="flex w-full bg-red-200/20 rounded-md  p-2 text-white shadow-sm  border-gray-200"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full flex justify-center p-4 mt-3">
              <button
                className="bg-indigo-800 text-white p-2 rounded-lg"
                type="submit"
                style={{ backgroundColor: "#db2032" }}>
                Book Hall
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
