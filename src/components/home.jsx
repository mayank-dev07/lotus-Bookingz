import { useEffect, useState } from "react";
import instance from "./axios";

export default function Home() {
  const [Halls, setHalls] = useState([]);

  useEffect(() => {
    const response = instance.get("list/");
    console.log(response);
    response
      .then(function (value) {
        console.log(value.data);
        setHalls(value.data);
      })
      .catch(function (error) {
        console.log(error.response.status);
        if (error.response.status === 401) {
          navigate("/");
        }
      });
  }, []);

  return (
    <>
      <div className=" mx-auto">
        <div className="w-full bg-[url('public/venuebookingz-home-banner.jpg')] h-96 bg-cover">
          <div className="w-full h-full flex  justify-center items-center">
            <span className="text-white text-4xl w-11/12 sm:w-1/2 text-center">
              Find Best Venue For Every Special Event
            </span>
          </div>
        </div>
        <div className=" h-max flex flex-col justify-center items-center p-14 bg-white">
          <span className="w-4/5 text-2xl text-center sm:text-4xl flex justify-center font-thin">
            Book Your Dream Venue at Our Guaranteed Best Prices
          </span>
          <span className="w-11/12 sm:w-2/3 mt-10 text-center sm:text-lg text-sm font-light pb-16">
            Looking venue for your Special Event? Venuebookingz® is one stop
            point to find a perfect venue to celebrate Birthday Party,
            Engagement, Wedding, Anniversary, Bachelor Party, Get-Together,
            Sangeet & Mehandi Function, Cocktail Parties. Venuebookingz
            recommend you personally curated list of venue options by experts
            specially for your requirements.
          </span>
        </div>
      </div>

      {/* <ul role="list" className="bg-gray-300">
        {Halls.map((person, index) => (
          <li
            key={index}
            className="flex justify-center px-24 border-b border-1 border-gray-400 p-3">
            <div className="min-w-0 flex-auto">
              <p className="text-sm font-semibold leading-6 text-black">
                {person.name}
              </p>
            </div>
            <div className="flex min-w-0 gap-x-4">
              {person.hall_image.map((image, index) => (
                <img
                  key={index}
                  className="h-12 w-12 flex-none rounded-full bg-gray-50"
                  src={image.image}
                  alt=""
                />
              ))}
            </div>
          </li>
        ))}
      </ul> */}
    </>
  );
}
