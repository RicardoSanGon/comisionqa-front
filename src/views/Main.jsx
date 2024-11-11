import { useState } from "react";
import { User } from "./User";

export function Main() {
  const [isOpen, setIsOpen] = useState(false);
  const [view, setView] = useState("menu");

  const toggleMenu = (e) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };

  const handleViewChange = (view) => {
    setView(view);
  };

  const renderView = () => {
    switch (view) {
      case "menu":
        return <div>Menu</div>;
      case "users":
        return <User />;
      case "catalogues":
        return <div>Catalogues</div>;
      default:
        return <div>Menu</div>;
    }
  };

  return (
    <>
      <div className="flex">
        <div
          className={`h-screen bg-emerald-600 ${
            isOpen
              ? "transition-all w-56 duration-200"
              : "transition-all w-16 duration-200"
          } relative space-y-4 overflow-y-auto`}
        >
          <div className="flex justify-center items-center relative">
            <button className="h-10" onClick={toggleMenu}>
              <img
                src="./../icons/menu_icon.svg"
                alt=""
                className="h-11 w-14 top-0 left-0 absolute bg-emerald-600 z-10"
              />
            </button>
            {isOpen && (
              <p
                className={`text-2xl w-full text-center ${
                  isOpen
                    ? "transition-all opacity-100 duration-300 delay-200 text-white"
                    : "transition-all opacity-0 duration-300 delay-200 text-emerald-600"
                }`}
              >
                Menu
              </p>
            )}
          </div>
          <div className="flex justify-center items-center relative">
            <button className="h-10" onClick={() => handleViewChange("users")}>
              <img
                src="./../icons/user_icon.svg"
                alt=""
                className="h-11 w-14 top-0 left-0 absolute bg-emerald-600 z-10"
              />
            </button>
            {isOpen && (
              <p
                className={`text-2xl w-full text-center ${
                  isOpen
                    ? "transition-all opacity-100 duration-300 delay-200 text-white"
                    : "transition-all opacity-0 duration-300 delay-200 text-emerald-600"
                }`}
              >
                Usuarios
              </p>
            )}
          </div>
          <div className="flex justify-center items-center relative">
            <button className="h-10" onClick={() => handleViewChange("catalogues")}>
              <img
                src="./../icons/catalogue_icon.svg"
                alt=""
                className="h-11 w-14 top-0 left-0 absolute bg-emerald-600 z-10"
              />
            </button>
            {isOpen && (
              <p
                className={`text-2xl w-full text-center ${
                  isOpen
                    ? "transition-all opacity-100 duration-300 delay-200 text-white"
                    : "transition-all opacity-0 duration-300 delay-200 text-emerald-600"
                }`}
              >
                Catalogos
              </p>
            )}
          </div>
        </div>
        <div className="w-screen">
            <div className="w-full h-16 bg-emerald-600"></div>
            <div className="m-5">
                {renderView()}
            </div>
        </div>
      </div>
    </>
  );
}
