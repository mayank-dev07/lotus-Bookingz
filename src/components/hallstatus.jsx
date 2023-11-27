import Auth from "./axios";
import { useState, useEffect, useRef } from "react";
import instance from "./axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function HallStatus() {
  const [people, setpeople] = useState([]);

  let id = useRef();

  useEffect(() => {
    const response = instance.get("emplist/");
    console.log(response);
    response
      .then(function (value) {
        console.log(value.data);
        setpeople(value.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const notify = (message) => {
    toast.info(message);
  };

  const status = (e) => {
    e.preventDefault();
    console.log(e.target.id);
    id = e.target.id;
    const response = instance.get("report/", {
      params: { booking: id },
    });
    console.log(response);
    response
      .then(function (value) {
        if (value.data.length > 0) {
          if (value.data[0].role === 2 && value.data[0].status === 2) {
            notify("Rejected");
          }
          if (value.data[0].role === 2 && value.data[0].status === 0) {
            notify("pending from hod");
          }
          if (value.data[0].role === 2 && value.data[0].status === 1) {
            notify("Approved from hod");

            if (value.data[1].role === 1 && value.data[1].status === 0) {
              notify("pending from admin");
            }
            if (value.data[1].role === 1 && value.data[1].status === 1) {
              notify("Accepted from admin");
            }
            if (value.data[1].role === 1 && value.data[1].status === 2) {
              notify("rejected from admin");
            }
          }
        } else {
          console.log(error);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <>
      <ToastContainer />
      <div className="relative overflow-x-auto shadow-md h-screen ">
        <table className="w-full text-sm text-gray-400">
          <thead className="uppercase bg-gray-700">
            <tr>
              <th className="px-6 py-3">S.no</th>
              <th className="px-6 py-3">Hall Name</th>
              <th className="px-6 py-3">Count</th>
              <th className="px-6 py-3">Date From</th>
              <th className="px-6 py-3">Date To</th>
              <th className="px-6 py-3">Time From</th>
              <th className="px-6 py-3">Time To</th>
              <th className="px-6 py-3">Remark</th>
              <th className="px-6 py-3">Purpose</th>
              <th className="px-6 py-3">Stuatus</th>
            </tr>
          </thead>
          <tbody>
            {people.map((person, index) => (
              <tr key={index} className="border-b bg-gray-800 border-gray-700">
                <td className="px-6 py-4">{index + 1}</td>
                <td className="px-6 py-4">{person.hall_data}</td>
                <td className="px-6 py-4">{person.participant_count}</td>
                <td className="px-6 py-4">{person.from_date}</td>
                <td className="px-6 py-4">{person.to_date}</td>
                <td className="px-6 py-4">{person.from_time}</td>
                <td className="px-6 py-4">{person.to_time}</td>
                <td className="px-6 py-4">{person.employee_remark}</td>
                <td className="px-6 py-4">{person.purpose}</td>
                <td className="px-6 py-4">
                  <button
                    type="button"
                    className="rounded-full px-3 p-2 text-white w-max
                    bg-indigo-800"
                    id={person.id}
                    onClick={(event) => status(event)}>
                    View Status
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
