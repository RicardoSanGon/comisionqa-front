import { useState, useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import { AuthContext } from '../authProvider'; 

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user,logout, loading } = useContext(AuthContext); 
  const toggleMenu = (e) => {
    e.preventDefault();
    setIsOpen(!isOpen);
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
          {user && (
            <div className="flex justify-center items-center relative">
              <Link to="users" className="h-10">
                <img
                  src="./../icons/user_icon.svg"
                  alt=""
                  className="h-11 w-14 top-0 left-0 absolute bg-emerald-600 z-10"
                />
              </Link>
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
          )}
          <div className="flex justify-center items-center relative">
            <Link to="catalogues" className="h-10">
              <img
                src="./../icons/catalogue_icon.svg"
                alt=""
                className="h-11 w-14 top-0 left-0 absolute bg-emerald-600 z-10"
              />
            </Link>
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
        <div className="flex-1 flex flex-col relative">
          <div className="w-full h-16 bg-emerald-600 flex justify-end">
            <div className="content-center mr-4">
               <p className="font-bold">{!loading && user && user.profile ? user.profile.username : "Nombre de usuario"}</p> 
              <p>{user ? user.email : "Correo del usuario"}</p>
            </div>
            <Link to="/login" className="h-full mr-5">
              <button className="right-0 h-full">
                <img
                  src="./../icons/user_icon.svg"
                  alt=""
                  className=" h-3/4"
                />
              </button>
            </Link>
              <button className="h-full mr-5" onClick={logout}>
            <img
              src="./../icons/logout-svgrepo-com.svg"
              alt="Logout"
              className="h-3/4"
            />
          </button>
          </div>
          <div className="m-5 flex-grow relative">
            <Outlet /> 
          </div>
        </div>
        <div
          className="absolute
              top-0
              left-0 
              w-screen 
              h-screen 
              bg-cover 
              bg-center 
              shadow-2xl
              content-center
              bg-opacity-80
              -z-50"
          style={{ backgroundImage: "url(/img/main_wallpaper.png)" }}
        ></div>
      </div>
    </>
  );
}

export default Navbar;