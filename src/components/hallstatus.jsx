import Auth from "./axios";
import { useEffect } from "react";

const people = [
  {
    name: "Leslie Alexander",
    image: [
      {
        imageUrl:
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      },
      {
        imageUrl:
          "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      },
      {
        imageUrl:
          "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      },
    ],
  },
  {
    name: "Michael Foster",
    image: [
      {
        imageUrl:
          "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      },
    ],
  },
];

export default function HallStatus() {
  console.log(people[0].image);
  return (
    <>
      <div className="w-full flex justify-center">
        <div className="w-11/12  p-4 sm:p-12">
          <ul role="list" className="">
            {people.map((person) => (
              <li
                key={person.email}
                className="flex flex-col sm:flex-row sm:justify-between p-5 border-2 mt-3 ">
                <div className="flex flex-col  sm:gap-x-4 gap-y-4">
                  <div className="flex sm:w-max justify-center">
                    <span className="text-base sm:text-lg font-semibold text-gray-900">
                      {person.name}
                    </span>
                  </div>
                  <div className="flex flex-wrap self-center w-max">
                    {person.image.map((file, index) => (
                      <li key={index} className="px-4 py-2">
                        <img
                          className="h-10 w-10 sm:h-16 sm:w-16 flex-none rounded-full bg-gray-50"
                          src={file.imageUrl}
                          alt=""
                        />
                      </li>
                    ))}
                  </div>
                </div>
                <div className="flex flex-wrap p-5 self-center">
                  <span>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Officia, facere! Aliquam maiores vel modi numquam officia
                    error, ut, debitis ad impedit ratione iusto ipsum quidem
                    aspernatur quis, illum dolore obcaecati.
                  </span>
                </div>
                <div className="flex self-center">
                  <button
                    type="button"
                    className="rounded-full p-2 text-white w-max
                    bg-indigo-800">
                    Status
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
