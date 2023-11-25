import { useState, useEffect, useRef } from "react";
import instance from "./axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function HodStatus() {
  const [people, setpeople] = useState([]);
  const [ApproveRemark, setApproveRemark] = useState("");
  const [Approved, setApproved] = useState();
  let id = useRef();

  useEffect(() => {
    const response = instance.get("hod_status/");
    console.log(response);
    response
      .then(function (value) {
        console.log(value.data);
        setpeople(value.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [Approved]);

  const notify = (message) => {
    if (message === "Booking Approved") {
      toast.success(message);
    } else {
      toast.error(message);
    }
  };

  const approve = (event) => {
    console.log(event.currentTarget.id);
    id = event.currentTarget.id;
    console.log(id);
    if (ApproveRemark) {
      const response = instance.put(`hodstatus/${id}/`, {
        status: "1",
        remark: ApproveRemark,
      });
      console.log(response);
      response
        .then(function (value) {
          console.log(value.status);
          if (value.status === 200) {
            setApproved(value.data);
            notify("Booking Approved");
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      notify("To Approve Enter Remark");
    }
  };

  return (
    <>
      <div className="w-full flex justify-center">
        <div className="w-full  p-4 sm:p-12">
          <div className="flex flex-wrap justify-evenly">
            {people.map((person) => (
              <div
                key={person.booked_hall.id}
                className="flex flex-wrap w-full sm:w-2/5 sm:justify-between p-5 border-2 mt-3 ">
                <div className="flex flex-col justify-center w-full ">
                  <div className="flex justify-center">
                    <span className="text-base sm:text-lg font-semibold text-gray-900">
                      Name of the Hall:-&nbsp;&nbsp;
                      {person.booked_hall.hall_data}
                    </span>
                  </div>
                  <div className="flex flex-wrap self-center w-max">
                    No of participants:-&nbsp;&nbsp;{" "}
                    <p>{person.booked_hall.participant_count}</p>
                  </div>
                </div>
                <div className="flex flex-col p-6 w-full justify-between">
                  <div className="flex flex-row justify-between ">
                    <div>
                      <span className="px-2">Date:-</span>
                      <div className="flex flex-col xl:flex-row ">
                        <span className="md:font:medium md:text-lg text-base">
                          From:-
                          {person.booked_hall.from_date}
                        </span>
                        <span className="px-2 md:font:medium md:text-lg text-base">
                          To:-
                          {person.booked_hall.to_date}
                        </span>
                      </div>
                    </div>
                    <div>
                      <span className="px-2 md:font:medium md:text-lg text-base">
                        Time:-
                      </span>
                      <div className="flex flex-col xl:flex-row">
                        <span className="md:font:medium md:text-lg text-base">
                          From:-
                          {person.booked_hall.from_time}
                        </span>
                        <span className="px-2 md:font:medium md:text-lg text-base">
                          To:-
                          {person.booked_hall.to_time}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row md:w-full xl:justify-between mt-6">
                    <div className="flex flex-row pr-2">
                      <span className="px-2 md:font:medium md:text-lg text-base">
                        Remark:-
                      </span>
                      <span className="md:font:medium md:text-lg text-base">
                        {person.booked_hall.employee_remark}
                      </span>
                    </div>
                    <div className="flex flex-row pr-2">
                      <span className="px-2 md:font:medium md:text-lg text-base">
                        Purpose:-
                      </span>
                      <span className="md:font:medium md:text-lg text-base">
                        {person.booked_hall.purpose}
                      </span>
                    </div>
                  </div>
                  <div className="mt-3">
                    <div className="flex rounded-md shadow-sm border-2 border-gray-300 w-full">
                      <input
                        type="text"
                        name="remark"
                        id="remark"
                        onChange={(e) => setApproveRemark(e.target.value)}
                        className=" flex-1  bg-transparent p-2 "
                        placeholder="Remark"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex w-full justify-evenly self-center">
                  <button
                    type="button"
                    className="rounded-full p-2 px-3 text-white w-max
                    bg-indigo-800"
                    id={person.id}
                    onClick={(event) => approve(event)}>
                    Approve
                  </button>
                  <button
                    type="button"
                    className="rounded-full px-3 text-white w-max
                    bg-red-800">
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  );
}
