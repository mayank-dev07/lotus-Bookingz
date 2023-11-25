import instance from "./axios";
import { useEffect } from "react";

export default function Home() {
  // useEffect(() => {
  //   const response = instance.get("userdetails/");
  //   console.log(response);
  // }, []);

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
        <div className=" h-max flex flex-col justify-center items-center mt-14">
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
    </>
  );
}
