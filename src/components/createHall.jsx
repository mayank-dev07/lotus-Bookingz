import { useState } from "react";
import { X } from "lucide-react";
import instance from "./axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function HallCreate() {
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

  function addConference(e) {
    e.preventDefault();
    let formData = new FormData();

    formData.append("name", e.target.name.value);
    formData.append("description", e.target.description.value);
    formData.append("occupancy", e.target.occupancy.value);
    formData.append("continous_booking_days_limit", e.target.contBooking.value);

    for (let i = 0; i < files.length; i++) {
      console.log(files[i]);
      formData.append("upload_image", files[i]);
    }

    console.log(formData);

    try {
      const response = instance.post("create_hall/", formData, {
        headers: {
          "Content-Type": "undefined",
        },
      });
      response
        .then((value) => {
          console.log(value);
          if (value.status === 200) {
            notify("Hall created Successfully !");
            e.target.reset();
            setFiles([]);
          }
        })
        .catch((error) => {
          console.log(error);
          if (error.response.status === 400) {
            notify("Enter valid data");
          }
        });
    } catch (error) {
      console.log(error);
    }
  }

  const remove = (index) => {
    setFiles((prevFile) => {
      return prevFile.splice(index, 1);
    });
  };

  return (
    <>
      <div className="w-full flex flex-col sm:flex-row justify-center sm:p-14 bg-[url('public/360_F_355588589_4MMBMTbudDotGpd3f2dwbWdJLDjsjsFd.jpg')] bg-cover ">
        <div className="sm:w-2/5 w-full backdrop-blur-md bg-gray-800/30 backdrop-opacity-10 shadow-lg">
          <div className="w-full h-full flex flex-col justify-center items-center">
            {/* <span className="text-white text-lg sm:text-4xl w-11/12 sm:w-1/2 text-center p-8">
              WELCOME
            </span> */}
            <span className="text-gray-300 text-lg sm:text-4xl w-11/12 sm:w-4/5 text-center">
              Add The Best Venue For Special Event
            </span>
          </div>
        </div>

        <div className="flex sm:w-3/5 w-full justify-center p-8  md:p-10 backdrop-blur-sm bg-red-300/20 backdrop-opacity-90">
          <form className=" w-full " onSubmit={addConference}>
            <div className="border-b border-gray-500 pb-5">
              <div className="">
                <div className="pb-5">
                  <label
                    htmlFor="name"
                    className="text-sm sm:text-lg sm:font-medium text-white"
                    // style={{ color: "red" }}
                  >
                    Name of the Hall
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm border-gray-300 sm:max-w-md">
                      <input
                        required
                        type="text"
                        name="name"
                        id="name"
                        autoComplete="name"
                        className="flex-1 bg-red-200/20 p-2 text-white opacity-80"
                        placeholder="Hall name"
                      />
                    </div>
                  </div>
                </div>

                <div className="w-full pb-4">
                  <label
                    htmlFor="description"
                    className="text-sm sm:text-lg sm:font-medium text-white">
                    Description
                  </label>
                  <div className="mt-2">
                    <textarea
                      required
                      id="description"
                      name="description"
                      rows={3}
                      placeholder="Description about the conference hall"
                      className="w-full bg-red-200/20 opacity-80 rounded-md  p-2 text-white shadow-sm border-gray-300"
                    />
                  </div>
                  <span className="mt-3 text-sm text-gray-400 ">
                    Write a few sentences about the Hall.
                  </span>
                </div>

                <div className="col-span-full">
                  <label
                    htmlFor="cover-photo"
                    className="flex text-sm sm:text-lg sm:font-medium text-white">
                    Cover photo
                  </label>
                  <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-500 px-6 py-10 bg-red-200/20 opacity-80">
                    <div className="text-center">
                      <div className="mt-4 flex text-sm  text-gray-600">
                        <label htmlFor="file-upload">
                          <span className="text-blue-300 underline underline-offset-4 font-base cursor-pointer">
                            Choose Images for the Hall
                          </span>
                          <input
                            required
                            type="file"
                            id="file-upload"
                            className="sr-only"
                            accept="image/jpeg, image/png"
                            multiple
                            onChange={handleFileChange}
                          />
                        </label>
                      </div>
                      <p className="text-xs leading-5 text-gray-300">
                        PNG, JPG, GIF up to 10MB
                      </p>
                    </div>
                  </div>
                </div>
                <ul className="flex flex-wrap mt-2">
                  {files.map((file, index) => (
                    <li
                      key={file.name}
                      className="flex px-5 border mr-2 mb-4 text-white">
                      {file.name}
                      <X
                        className="ml-2 px-1 cursor-pointer"
                        onClick={() => remove(index)}
                      />
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="border-b border-gray-500 pb-9 flex items-center">
              <div className="mt-10 flex flex-col sm:flex-row justify-evenly w-full">
                <div className=" w-full sm:w-2/5">
                  <label
                    htmlFor="occupancy"
                    className="text-sm sm:text-lg sm:font-medium text-white">
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
                      placeholder="occupancy"
                      className="flex w-full m:w-full bg-red-200/20 opacity-80 rounded-md border-0 p-2 text-white shadow-sm  border-gray-300"
                    />
                  </div>
                </div>

                <div className=" w-full sm:w-2/5 mt-4 sm:mt-0">
                  <label
                    htmlFor="contBooking"
                    className="text-sm sm:text-lg sm:font-medium text-white">
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
                      placeholder="Continous booking"
                      className="flex w-full sm:w-full bg-red-200/20 opacity-80 rounded-md border-0 p-2  text-white shadow-sm  border-gray-300"
                    />
                  </div>
                </div>
                {/* </div> */}
              </div>
            </div>

            <div className="mt-8 flex items-center justify-center gap-x-6 w-full sm:gap-x-24">
              <button
                type="submit"
                className="rounded-md bg-indigo-700 px-3 py-2 w-32 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
                style={{ backgroundColor: "#db2032" }}>
                Add Hall
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
