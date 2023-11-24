import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import instance from "./axios";
// import BookHall from "./bookHall";

export default function BookForm() {
  const navigate = useNavigate();
  const [hallData, sethallData] = useState({
    hallname: "",
    purpose: "",
    remark: "",
    participantNo: "",
    fromDate: "",
    toDate: "",
    fromtime: "",
    totime: "",
  });

  const handleChange = (e) => {
    sethallData({
      ...hallData,
      [e.target.name]: e.target.value,
    });
  };

  const Options = [
    {
      id: 1,
      name: "Option 1",
    },
    {
      id: 2,
      name: "Option 2",
    },
  ];
  useEffect(() => {
    const response = instance.get("list/");
    console.log(response);
    // setOptions(response.data)
  }, []);
  function book() {
    console.log(hallData);
    // navigate("/book");
  }
  return (
    <>
      <div className="w-full flex justify-center sm:p-8">
        <div className="w-full sm:w-3/5 p-16">
          <form className=" w-full ">
            <div className="border-b border-gray-300 pb-5">
              <div className="">
                <div className="w-full pb-5 mr-2">
                  <label htmlFor="hallName" className="text-sm sm:text-base">
                    Hall name
                  </label>
                  <div className="mt-2">
                    <select
                      value={hallData.hallname}
                      onChange={handleChange}
                      name="hallname"
                      className="w-full bg-white rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-400">
                      <option>Choose Hall</option>
                      {Options.map((option) => (
                        <option key={option.id}>{option.name}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="flex">
                  <div className="w-1/2 pb-5 mr-2">
                    <label htmlFor="purpose" className="text-sm sm:text-base">
                      Purpose
                    </label>
                    <div className="mt-2">
                      <input
                        onChange={handleChange}
                        required
                        value={hallData.purpose}
                        id="purpose"
                        name="purpose"
                        placeholder="Purpose to book conference hall"
                        className="w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-400"
                      />
                    </div>
                  </div>
                  <div className="w-1/2 pb-5">
                    <label
                      htmlFor="participantNo"
                      className="text-sm sm:text-base">
                      Participant count
                    </label>
                    <div className="mt-2">
                      <input
                        required
                        type="number"
                        id="participantNo"
                        name="participantNo"
                        min={1}
                        // onChange={handleChange}
                        // value={hallData.participantNo}
                        placeholder="No of participants"
                        className="w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-400"
                      />
                    </div>
                  </div>
                </div>

                <div className="w-full pb-5">
                  <label htmlFor="remark" className="text-sm sm:text-base">
                    Remark
                  </label>
                  <div className="mt-2">
                    <textarea
                      onChange={handleChange}
                      value={hallData.remark}
                      required
                      id="remark"
                      name="remark"
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
                  <label htmlFor="fromDate" className="text-sm sm:text-base">
                    Date from
                  </label>
                  <div className="mt-2 ">
                    <input
                      onChange={handleChange}
                      value={hallData.fromDate}
                      required
                      type="date"
                      name="fromDate"
                      id="fromDate"
                      placeholder=""
                      className="flex w-full rounded-md border-0 p-2 text-gray-900 shadow-sm border-2 border-gray-300"
                    />
                  </div>
                </div>
                <div className=" w-full sm:w-2/5">
                  <label htmlFor="toDate" className="text-sm sm:text-base">
                    Date to
                  </label>
                  <div className="mt-2">
                    <input
                      onChange={handleChange}
                      value={hallData.toDate}
                      required
                      type="date"
                      name="toDate"
                      id="toDate"
                      placeholder=""
                      className="flex w-full rounded-md border-0 p-2 text-gray-900 shadow-sm border-2 border-gray-300"
                    />
                  </div>
                </div>
              </div>
              <div className="mt-10 flex flex-col sm:flex-row justify-evenly w-full">
                <div className=" w-full sm:w-2/5">
                  <label htmlFor="fromtime" className="text-sm sm:text-base">
                    Time from
                  </label>
                  <div className="mt-2">
                    <input
                      onChange={handleChange}
                      value={hallData.fromtime}
                      required
                      type="time"
                      name="fromtime"
                      id="fromtime"
                      placeholder=""
                      className="flex w-full rounded-md border-0 p-2 text-gray-900 shadow-sm border-2 border-gray-300"
                    />
                  </div>
                </div>
                <div className=" w-full sm:w-2/5">
                  <label htmlFor="totime" className="text-sm sm:text-base">
                    Time to
                  </label>
                  <div className="mt-2">
                    <input
                      onChange={handleChange}
                      value={hallData.totime}
                      required
                      type="time"
                      name="totime"
                      id="totime"
                      placeholder=""
                      className="flex w-full rounded-md border-0 p-2 text-gray-900 shadow-sm border-2 border-gray-300"
                    />
                  </div>
                </div>
              </div>
            </div>
          </form>
          <div className="w-full flex justify-center p-8">
            <button
              className="bg-indigo-800 text-white p-2 rounded-lg"
              onClick={book}>
              Book Hall
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
