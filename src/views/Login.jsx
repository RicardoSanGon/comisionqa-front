import { useState } from "react";
import SubmitButton from "../components/submitBotton";
import env from "../env";
import { fetchDataPost } from "../fetchData";
import { Loading } from "../components/loading";
import { Error } from "../components/error";
import { RegisterButton } from "../components/registerButton";
import { Link } from "react-router-dom";

const pause = (duration) =>
  new Promise((resolve) => setTimeout(resolve, duration));

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [areErrors, setAreErrors] = useState(false);
  const [emailErrors, setEmailErrors] = useState([]);
  const [passwordErrors, setPasswordErrors] = useState([]);
  const [repeatPasswordErrors, setRepeatPasswordErrors] = useState([]);
  const [invalidCredentials, setInvalidCredentials] = useState(false);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const handleRepeatPasswordChange = (event) => {
    setRepeatPassword(event.target.value);
  };

  const sendForm = async (event) => {
    event.preventDefault();
    setEmailErrors([]);
    setPasswordErrors([]);
    setRepeatPasswordErrors([]);
    setInvalidCredentials(false);
    setIsLoading(true);
    try {
      const response = await fetchDataPost(`${env.api}/auth/login`, {
        email: email,
        password: password,
        password_confirmation: repeatPassword,
      })
        .then((res) => res.json())
        .then((data) => data)
        .finally(() => {
          setIsLoading(false);
        });
      if (response.errors) {
        setEmailErrors(response.errors.email ?? []);
        setPasswordErrors(response.errors.password ?? []);
        setRepeatPasswordErrors(response.errors.password_confirmation ?? []);
        setAreErrors(true);
        await pause(1000);
      }
      if (response.status === 401 || response.status === 404) {
        setInvalidCredentials(true);
        await pause(1000);
      }
    } catch (error) {
      if (error.message.includes("Failed to fetch")) {
        setAreErrors(true);
        await pause(1000);
      }
    }

    setAreErrors(false);
  };

  return (
    <div
      className="relative 
        w-screen 
        h-screen 
        bg-cover 
        bg-center 
        shadow-2xl
        content-center
        bg-opacity-80"
      style={{ backgroundImage: "url(/img/fondo_login.webp)" }}
    >
      <div className="flex justify-center">
        <p className="text-6xl text-white my-8 font-custom">{env.titleLogin}</p>
      </div>
      <form
        className="max-w-md mx-auto backdrop-blur-md rounded-2xl p-8 shadow-2xl shadow-black"
        onSubmit={sendForm}
        method="POST"
      >
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="email"
            name="email"
            className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-400 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
            max={30}
            value={email}
            onChange={handleEmailChange}
          />
          <label
            htmlFor="email"
            className="peer-focus:font-medium absolute text-sm  text-white dark:text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Email
          </label>
          {emailErrors.length > 0 && (
            <div className="text-red-500 text-sm mt-1">
              {emailErrors.map((error, index) => (
                <p key={index}>{error}</p>
              ))}
            </div>
          )}
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="password"
            name="password"
            className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-400 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
            max={30}
            min={8}
            value={password}
            onChange={handlePasswordChange}
          />
          <label
            htmlFor="password"
            className="peer-focus:font-medium absolute text-sm  text-white dark:text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Password
          </label>
          {passwordErrors.length > 0 && (
            <div className="text-red-500 text-sm mt-1">
              {passwordErrors.map((error, index) => (
                <p key={index}>{error}</p>
              ))}
            </div>
          )}
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="password"
            name="repeat_password"
            className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-whitedark:border-gray-400 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
            max={30}
            min={8}
            value={repeatPassword}
            onChange={handleRepeatPasswordChange}
          />
          <label
            htmlFor="repeat_password"
            className="peer-focus:font-medium absolute text-sm text-white dark:text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Repeat Password
          </label>
          {repeatPasswordErrors.length > 0 && (
            <div className="text-red-500 text-sm mt-1">
              {repeatPasswordErrors.map((error, index) => (
                <p key={index}>{error}</p>
              ))}
            </div>
          )}
        </div>
        <div className="flex">
          <div className="flex justify-start w-full">
            <Link to="/register">
              <RegisterButton
                buttonText="Crea una cuenta!"
                hoverText="Registrate!"
              />
            </Link>
          </div>
          <div className="flex justify-end w-full">
            <SubmitButton>Aceptar</SubmitButton>
          </div>
        </div>
      </form>
      {isLoading && <Loading />}
      {areErrors && <Error />}
      {invalidCredentials && (
        <div className="fixed bottom-0 left-0 right-0 flex justify-center mb-20 h-20">
          <div className="rounded-sm bg-red-600 w-3/12 h-3/4 flex justify-center items-center outline outline-red-400">
            <img src="/img/danger_icon.svg" className="mr-2"/>
            <p className="text-red-200 text-center text-xl">Credenciales inválidas</p>
          </div>
        </div>
      )}
    </div>
  );
}
