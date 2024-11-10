import { useState } from "react";
import SubmitButton from "../components/submitBotton";
import env from "../env";
import { Loading } from "../components/loading";
import { fetchDataPost } from "./../fetchData";
import { Error } from "../components/error";
import { Link } from "react-router-dom";
import { SesionButton } from "../components/sesionButton";

const pause = (duration) => new Promise(resolve => setTimeout(resolve, duration));

function Register() {

    const [firstname, setFirstName] = useState('');
    const [paternal, setPaternal] = useState('');
    const [maternal, setMaternal] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [ areErrors, setAreErrors] = useState(false)

    const handleFirstNameChange = (e) => {setFirstName(e.target.value)};
    const handlePaternalChange = (e) => {setPaternal(e.target.value)};
    const handleMaternalChange = (e) => {setMaternal(e.target.value)};
    const handleEmailChange = (e) => {setEmail(e.target.value)};
    const handlePasswordChange = (e) => {setPassword(e.target.value)};
    const handleRepeatPasswordChange = (e) => {setRepeatPassword(e.target.value)};
    const handlePhoneChange = (e) => {setPhone(e.target.value)};
    const handleAddressChange = (e) => {setAddress(e.target.value)};

    const sendForm = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const response = await fetchDataPost(`${env.api}/auth/register`, {
            firstname: firstname,
            paternal: paternal,
            maternal: maternal,
            email: email,
            password: password,
            password_confirmation: repeatPassword,
            phone: phone,
            address: address
        }).then(response => response.json())
        .then(data => data)
        .finally(() => setIsLoading(false))
        .catch(error => error);
        if(response.errors){
            console.log(response.errors)
            setAreErrors(true)
            await pause(1000)
        }
        else {
            console.log(response)
        }
        setAreErrors(false)
      };

    return (
        <div className="relative 
        w-screen 
        h-screen 
        bg-cover 
        bg-center 
        shadow-2xl
        content-center
        bg-opacity-80" style={{ backgroundImage: 'url(/img/fondo_registro.webp)' }}>
            <div className="flex justify-center">
                <p className="text-6xl text-white my-8 font-custom">{env.titleRegister}</p>
            </div>
        <form className="max-w-md mx-auto backdrop-blur-md rounded-2xl p-8 shadow-2xl shadow-black" onSubmit={sendForm} method="POST">
            <div className="relative z-0 w-full mb-5 group">
                <input type="text" name="firstname" className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-400 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required 
                max={30}
                value={firstname}
                onChange={handleFirstNameChange}/>
                <label htmlFor="firstname" className="peer-focus:font-medium absolute text-sm  text-white dark:text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Fisrts Name</label>
            </div>
            <div className="flex space-x-4">
                <div className="relative z-0 w-full mb-5 group">
                    <input type="text" name="paternal" className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-400 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required 
                    max={30}
                    value={paternal}
                    onChange={handlePaternalChange}/>
                    <label htmlFor="paternal" className="peer-focus:font-medium absolute text-sm  text-white dark:text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Paternal</label>
                </div>
                <div className="relative z-0 w-full mb-5 group">
                    <input type="text" name="maternal" className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-400 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required 
                    max={30}
                    value={maternal}
                    onChange={handleMaternalChange}/>
                    <label htmlFor="maternal" className="peer-focus:font-medium absolute text-sm  text-white dark:text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Maternal</label>
                </div>
            </div>
            <div className="relative z-0 w-full mb-5 group">
                    <input type="email" name="email" className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-400 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required 
                    max={30}
                    value={email}
                    onChange={handleEmailChange}/>
                    <label htmlFor="email" className="peer-focus:font-medium absolute text-sm  text-white dark:text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email</label>
            </div>
            <div className="relative z-0 w-full mb-5 group">
                    <input type="password" name="password" className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-400 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required 
                    max={30}
                    min={8}
                    value={password}
                    onChange={handlePasswordChange}/>
                    <label htmlFor="password" className="peer-focus:font-medium absolute text-sm  text-white dark:text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
            </div>
            <div className="relative z-0 w-full mb-5 group">
                    <input type="password" name="repeat_password" className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-whitedark:border-gray-400 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required 
                    max={30}
                    min={8}
                    value={repeatPassword}
                    onChange={handleRepeatPasswordChange}/>
                    <label htmlFor="repeat_password" className="peer-focus:font-medium absolute text-sm text-white dark:text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Repeat Password</label>
            </div>
            <div className="relative z-0 w-full mb-5 group">
                    <input type="text" name="phone" className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-whitedark:border-gray-400 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required 
                    max={10}
                    min={10}
                    value={phone}
                    onChange={handlePhoneChange}/>
                    <label htmlFor="phone" className="peer-focus:font-medium absolute text-sm text-white dark:text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone</label>
            </div>
            <div className="relative z-0 w-full mb-5 group">
                    <input type="text" name="address" className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-whitedark:border-gray-400 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required 
                    max={80}
                    value={address}
                    onChange={handleAddressChange}/>
                    <label htmlFor="address" className="peer-focus:font-medium absolute text-sm text-white dark:text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Address</label>
            </div>

            <div className="flex">
                <div className="flex justify-start w-full">
                    <Link to="/">
                        <SesionButton buttonText="Incia Sesión!" hoverText="Acceder!" />
                    </Link>
                </div>
                <div className="flex justify-end w-full">
                    <SubmitButton>Aceptar</SubmitButton>  
                </div> 
            </div>
        </form>
        {isLoading && <Loading />}
        { areErrors && <Error/>}
    </div>
    );
}

export default Register;