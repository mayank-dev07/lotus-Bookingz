import { useNavigate } from "react-router-dom";
import { useState } from "react";
const navigation = [
  { name: "Home", href: "#", current: false },
  { name: "About", href: "#", current: false },
  { name: "Conact", href: "#", current: false },
  { name: "Booking", href: "#", current: false },
];
export default function Nav() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  function logout() {
    navigate("/");
  }
  return (
    <>
      <div className="mx-auto px-2 bg-gradient-to-r from-gray-700 via-gray-900 to-black w-full">
        <div className="flex h-16 items-center justify-between">
          <div className="flex flex-shrink-0 items-center ">
            <img className="h-12 w-auto" src="lotus.webp" alt="Your Company" />
            <span className="text-white flex self-center text-2xl">
              Lotus Bookingz
            </span>
          </div>
          <div className="flex">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-white px-24"
                //   className={classNames(
                //     item.current
                //       ? "bg-gray-900 text-white"
                //       : "text-gray-300 hover:bg-gray-700 hover:text-white",
                //     "rounded-md px-3 py-2 text-sm font-medium"
                //   )}
                // aria-current={item.current ? "page" : undefined}
              >
                {item.name}
              </a>
            ))}
          </div>
          <div className="flex justify-center">
            <div className=" mr-6 block">
              <div className="flex space-x-4">
                <button className="text-white" onClick={logout}>
                  Log-out
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr />
    </>
  );
}
