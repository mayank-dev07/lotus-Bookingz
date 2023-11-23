import { useState } from "react";
import { X } from "lucide-react";
import Auth from "./axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function HallCreate() {
  function fetchData() {
    const response = Auth.get("userdetails/");
    console.log(response);
  }
  fetchData();

  const [files, setFiles] = useState([]);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFiles((prevFiles) => [...prevFiles, selectedFile]);
  };

  const notify = (message) => {
    if (message === "Hall created Successfully !") {
      toast.success(message);
    } else {
      toast.error(message);
    }
  };

  function AddConference(e) {
    e.preventDefault();
    let formData = new FormData();

    formData.append("name", e.target.name.value);
    formData.append("description", e.target.description.value);
    formData.append("occupancy", e.target.occupancy.value);
    formData.append("continous_booking_days_limit", e.target.contBooking.value);

    for (let i = 0; i < files.length; i++) {
      console.log(files[i]);
      formData.append("image", files[i]);
    }

    console.log(formData);

    try {
      const response = Auth.post("create_hall/", formData, {
        headers: {
          "Content-Type": "undefined",
        },
      });
      console.log(response.data);
      e.target.reset();
      setFiles([]);
      notify("Hall created Successfully !");
    } catch (error) {
      console.log(error);
    }
  }

  const Remove = (index) => {
    setFiles((prevFile) => {
      return prevFile.splice(index, 1);
    });
  };

  return (
    <>
      <div className="flex w-full justify-center p-8  md:p-12">
        <form className=" w-full sm:w-1/2" onSubmit={AddConference}>
          <div className="border-b border-gray-300 pb-5">
            <div className="">
              <div className="pb-5">
                <label htmlFor="name" className="text-sm sm:text-base">
                  Name of the Hall
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm border-2 border-gray-300 sm:max-w-md">
                    <input
                      required
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
                    required
                    id="description"
                    name="description"
                    rows={3}
                    placeholder="Description about the conference hall"
                    className="w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-400"
                  />
                </div>
                <p className="mt-3 text-sm text-gray-600">
                  Write a few sentences about the Hall.
                </p>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="cover-photo"
                  className="flex text-sm sm:text-base">
                  Cover photo
                </label>
                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-400 px-6 py-10">
                  <div className="text-center">
                    <div className="mt-4 flex text-sm leading-6 text-gray-600">
                      <label htmlFor="file-upload">
                        <span className="text-indigo-600 underline underline-offset-4 font-base cursor-pointer">
                          Choose Images for the Hall
                        </span>
                        <input
                          // requireds
                          type="file"
                          id="file-upload"
                          className="sr-only"
                          accept="image/jpeg, image/png"
                          multiple
                          onChange={handleFileChange}
                        />
                      </label>
                    </div>
                    <p className="text-xs leading-5 text-gray-600">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
                </div>
              </div>
              <ul className="flex flex-wrap mt-2  ">
                {files.map((file, index) => (
                  <li key={file.name} className="flex px-5 border mr-2 mb-4">
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

          <div className="border-b border-gray-300 pb-12 flex items-center">
            <div className="mt-10 flex flex-col sm:flex-row justify-evenly w-full">
              <div className=" w-full sm:w-2/5">
                <label htmlFor="occupancy" className="text-sm sm:text-base">
                  Occupancy
                </label>
                <div className="mt-2">
                  <input
                    required
                    type="number"
                    name="occupancy"
                    id="occupancy"
                    min={10}
                    max={10000}
                    placeholder=""
                    className="flex w-fit sm:w-full rounded-md border-0 p-2 text-gray-900 shadow-sm border-2 border-gray-300"
                  />
                </div>
              </div>

              <div className=" w-full sm:w-2/5 mt-4 sm:mt-0">
                <label htmlFor="contBooking" className="text-sm sm:text-base">
                  Continous Booking
                </label>
                <div className="mt-2">
                  <input
                    required
                    type="number"
                    name="contBooking"
                    id="contBooking"
                    min={1}
                    max={10}
                    placeholder=""
                    className="flex w-fit sm:w-full rounded-md border-0 p-2  text-gray-900 shadow-sm border-2 border-gray-300"
                  />
                </div>
              </div>
              {/* </div> */}
            </div>
          </div>

          <div className="mt-6 flex items-center justify-center gap-x-6 sm:gap-x-24">
            <button
              type="submit"
              className="rounded-md bg-indigo-900 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700">
              Add Hall
            </button>
          </div>
        </form>
        <ToastContainer />
      </div>
    </>
  );
}
