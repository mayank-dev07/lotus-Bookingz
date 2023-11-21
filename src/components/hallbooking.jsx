import { useState, useEffect } from "react";
import { X } from "lucide-react";
import Auth from "./axios";

export default function HallCreate() {
  const [files, setFiles] = useState([]);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFiles((prevFiles) => [...prevFiles, selectedFile]);
  };

  function AddConference(e) {
    e.preventDefault();
    let formData = new FormData();
    formData.append("name", e.target.name.value);
    formData.append("description", e.target.description.value);
    formData.append("occupancy", e.target.occupacy.value);
    formData.append("continous_booking_days_limit", e.target.contBooking.value);
    formData.append("image", files);
    console.log(formData);
    useEffect(() => {
      const createHall = async () => {
        try {
          const response = await Auth.post("create_hall/", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          setUser(response.data);
        } catch (error) {
          console.log(error);
        }
      };

      createHall();
    }, []);
  }
  const Remove = (index) => {
    setFiles((prevFile) => {
      return prevFile.splice(index, 1);
    });
  };

  return (
    <>
      <div className="flex w-full justify-center p-4  md:p-14">
        <form className=" w-full sm:w-1/2" onSubmit={AddConference}>
          <div className="border-b pb-12">
            <div className="">
              <div className="pb-5">
                <label htmlFor="name" className="text-sm sm:text-base">
                  Name of the Hall
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-gray-300 sm:max-w-md">
                    <input
                      type="text"
                      name="name"
                      id="name"
                      autoComplete="name"
                      className=" flex-1  bg-transparent p-2 "
                      placeholder="Hall name"
                    />
                  </div>
                </div>
              </div>

              <div className="w-full pb-5">
                <label htmlFor="description" className="text-sm sm:text-base">
                  Description
                </label>
                <div className="mt-2">
                  <textarea
                    id="description"
                    name="description"
                    rows={3}
                    className="w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300"
                  />
                </div>
                <p className="mt-3 text-sm text-gray-600">
                  Write a few sentences about the Hall.
                </p>
              </div>

              {/* className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"> */}
              <div className="col-span-full">
                <label
                  htmlFor="cover-photo"
                  className="flex text-sm sm:text-base">
                  Cover photo
                </label>
                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                  <div className="text-center">
                    <div className="mt-4 flex text-sm leading-6 text-gray-600">
                      <label htmlFor="file-upload">
                        <span className="text-indigo-600 underline underline-offset-4 font-base cursor-pointer">
                          Choose Images for the Hall
                        </span>
                        <input
                          type="file"
                          id="file-upload"
                          className="sr-only"
                          multiple
                          onChange={handleFileChange}
                        />
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <ul className="flex mt-2  ">
                {files.map((file, index) => (
                  <li
                    key={file.name}
                    className="flex flex-wrap px-5 border mr-2 ">
                    {file.name}
                    <X
                      className="ml-2 px-1 cursor-pointer"
                      onClick={() => Remove(index)}
                    />
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-b border-gray-900/10 pb-12">
            <div className="mt-10 flex justify-evenly w-full">
              <div className="w-2/5">
                <label htmlFor="occupacy" className="text-sm sm:text-base">
                  Occupacy
                </label>
                <div className="mt-2">
                  <input
                    type="number"
                    name="occupacy"
                    id="occupacy"
                    className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-gray-300"
                  />
                </div>
              </div>

              <div className="w-2/5">
                <label htmlFor="contBooking" className="text-sm sm:text-base">
                  Continous Booking
                </label>
                <div className="mt-2">
                  <input
                    type="number"
                    name="contBooking"
                    id="contBooking"
                    className="block w-full rounded-md border-0 p-2  text-gray-900 shadow-sm ring-1 ring-gray-300"
                  />
                </div>
              </div>
              {/* </div> */}
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button
              type="button"
              className="text-sm font-semibold leading-6 text-gray-900">
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
              Save
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
