import { useState, useEffect, useRef } from "react";
import instance from "./axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AdminStatus() {
  const [people, setpeople] = useState([]);
  const [Remark, setRemark] = useState("");
  const [Approved, setApproved] = useState();
  const [Options, setOptions] = useState([]);
  const [Alloted, setAlloted] = useState();
  const [appid, setappid] = useState("");

  let id = useRef();
  let Status = useRef();

  useEffect(() => {
    const response = instance.get("aostatuslist/");
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

  useEffect(() => {
    const response = instance.get("aolist/");
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

  const notify = (message) => {
    if (message === "Status Approved") {
      toast.success(message);
    } else {
      toast.error(message);
    }
  };

  function result() {
    const response = instance.put(`aostatus/${id}/`, {
      status: Status,
      remark: Remark,
      alloted: Alloted,
    });
    console.log(response);
    response
      .then(function (value) {
        console.log(value.status);
        if (value.status === 200) {
          setApproved(value.data);
          notify("Status Approved");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const approve = (event) => {
    id = event.currentTarget.id;
    console.log(id);
    Status = 1;
    console.log(Alloted);
    if (Remark && appid === id && Alloted) {
      result();
      setAlloted("");
      console.log(Alloted);
      console.log("yes");
    } else {
      notify("To Approve Enter Details");
    }
  };

  const reject = (event) => {
    id = event.currentTarget.id;
    console.log(id);
    Status = 2;
    if (Remark && appid === id) {
      result();
      console.log("yes");
    } else {
      notify("To Reject Enter Status");
    }
  };

  const app = (e) => {
    setappid(e.currentTarget.id);
    setRemark(e.target.value);
    console.log(appid);
    console.log(Remark);
  };

  return (
    <>
      <ToastContainer />

      <div className="relative overflow-x-auto shadow-md  h-screen">
        {/* {people.length > 0 ? ( */}
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
              <th className="px-6 py-3">Alloted</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Approve</th>
              <th className="px-6 py-3">Reject</th>
            </tr>
          </thead>
          <tbody>
            {people.map((person, index) => (
              <tr className=" border-b bg-gray-800 border-gray-700" key={index}>
                <td className="px-6 py-4">{index + 1}</td>
                <td className="px-6 py-4">{person.booked_hall.hall_data}</td>
                <td className="px-6 py-4">
                  {person.booked_hall.participant_count}
                </td>
                <td className="px-6 py-4">{person.booked_hall.from_date}</td>
                <td className="px-6 py-4">{person.booked_hall.to_date}</td>
                <td className="px-6 py-4">{person.booked_hall.from_time}</td>
                <td className="px-6 py-4">{person.booked_hall.to_time}</td>
                <td className="px-6 py-4 flex flex-wrap">
                  {person.booked_hall.employee_remark}
                </td>
                <td className="px-6 py-4">{person.booked_hall.purpose}</td>
                <td className="px-6 py-4">
                  {/* <form action=""> */}
                  <select
                    onChange={(e) => setAlloted(e.target.value)}
                    name="alloted"
                    className="flex-1  bg-gray-600 p-2  ">
                    <option value="">Choose Hall</option>
                    {Options.map((option) => (
                      <option key={option.pk} value={option.pk}>
                        {option.name}
                      </option>
                    ))}
                  </select>
                  {/* </form> */}
                </td>
                <td className="px-4 py-4">
                  {
                    <input
                      type="text"
                      name="remark"
                      id={person.id}
                      onChange={app}
                      className=" flex-1  bg-gray-600 p-2 "
                      placeholder="Remark"
                      //   onBlur={(e) => (e.target.value = "")}
                    />
                  }
                </td>

                <td className="px-6 py-4">
                  {
                    <button
                      type="button"
                      className="rounded-full p-2 px-3 text-white w-max
                    bg-indigo-800"
                      id={person.id}
                      onClick={(event) => approve(event)}>
                      Approve
                    </button>
                  }
                </td>
                <td className="px-6 py-4">
                  {
                    <button
                      type="button"
                      className="rounded-full px-3 p-2 text-white w-max
                    bg-red-800"
                      id={person.id}
                      onClick={(event) => reject(event)}>
                      Reject
                    </button>
                  }
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
