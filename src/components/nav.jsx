import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { AlignJustify } from "lucide-react";
import { Link } from "react-router-dom";

const navigation = [
  { name: "Home", href: "/home", current: false },
  { name: "Status", href: "/status", current: false },
  { name: "Create Hall", href: "/hall", current: false },
  { name: "Booking", href: "/book", current: false },
];
export default function Nav() {
  let [open, setOpen] = useState(false);
  const navigate = useNavigate();

  function logout() {
    navigate("/");
  }

  return (
    <>
      <div className="py-2 px-2 bg-gradient-to-r from-gray-700 via-gray-900 to-black w-full">
        <div className="flex h-max items-center justify-between">
          <div
            onClick={() => setOpen(!open)}
            className="text-3xl cursor-pointer md:hidden text-white">
            <AlignJustify />
          </div>

          <div className="flex flex-shrink-0 items-center ">
            <img className="h-12 w-auto" src="lotus.webp" alt="Your Company" />
            <span className="text-white flex self-center text-2xl cursor-default">
              Lotus Bookingz
            </span>
          </div>
          <div className="flex w-full justify-evenly">
            <ul
              className={` flex-col sm:flex-row justify-evenly pb-2 absolute md:static md:z-auto z-50 left-0 w-full ${
                open
                  ? "top-12 block justify-between p-4 bg-gradient-to-r from-gray-700 via-gray-900 to-black"
                  : "hidden sm:flex"
              }`}>
              {navigation.map((item) => (
                <li
                  key={item.name}
                  className="text-white flex-wrap pb-4 sm:pb-0">
                  <Link to={item.href} className="cursor-pointer">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex justify-center">
            <div className="ml-5 mr-5 block">
              <div className="flex space-x-4">
                <button className="text-white" onClick={logout}>
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
