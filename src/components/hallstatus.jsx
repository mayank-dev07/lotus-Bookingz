import Auth from "./axios";
import { useState, useEffect } from "react";
import instance from "./axios";

export default function HallStatus() {
  const [people, setpeople] = useState([]);
  useEffect(() => {
    const response = instance.get("bookhall/");
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

  // console.log(people[0].image);
  return (
    <>
      <div className="w-full flex justify-center">
        <div className="w-full  p-4 sm:p-12">
          <div className="flex flex-wrap justify-evenly">
            {people.map((person, index) => (
              <div
                key={index}
                className="flex flex-wrap w-full sm:w-2/5 sm:justify-between p-5 border-2 mt-3 ">
                <div className="flex flex-col justify-center w-full ">
                  <div className="flex justify-center">
                    <span className="text-base sm:text-lg font-semibold text-gray-900">
                      Name of the Hall:-&nbsp;&nbsp;{person.hall_data}
                    </span>
                  </div>
                  <div className="flex flex-wrap self-center w-max">
                    No of participants:-&nbsp;&nbsp;{" "}
                    <p>{person.participant_count}</p>
                  </div>
                </div>
                <div className="flex flex-col p-6 w-full justify-between">
                  <div className="flex flex-row justify-between ">
                    <div>
                      <span className="px-2">Date:-</span>
                      <div className="flex flex-col xl:flex-row ">
                        <span className="font:medium text-lg">
                          From:-
                          {person.from_date}
                        </span>
                        <span className="px-2 font:medium text-lg">
                          To:-
                          {person.to_date}
                        </span>
                      </div>
                    </div>
                    <div>
                      <span className="px-2 font:medium text-lg">Time:-</span>
                      <div className="flex flex-col xl:flex-row">
                        <span className="font:medium text-lg">
                          From:-
                          {person.from_time}
                        </span>
                        <span className="px-2 font:medium text-lg">
                          To:-
                          {person.to_time}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row md:w-full xl:justify-between mt-6">
                    <div className="flex flex-row pr-2">
                      <span className="px-2 font:medium text-lg">Remark:-</span>
                      <span className="font:medium text-lg">
                        {person.employee_remark}
                      </span>
                    </div>
                    <div className="flex flex-row pr-2">
                      <span className="px-2 font:medium text-lg">
                        Purpose:-
                      </span>
                      <span className="font:medium text-lg">
                        {person.purpose}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex w-full justify-center self-center">
                  {/* <button
                    type="button"
                    className="rounded-full p-2 text-white w-max
                    bg-indigo-800">
                    Status
                  </button> */}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
