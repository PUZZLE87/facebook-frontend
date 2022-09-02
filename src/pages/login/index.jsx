import LoginForm from "../../components/login/LoginForm";
import RegisterForm from "../../components/login/RegisterForm";
import { Link } from "react-router-dom";
import { useState } from "react";



const Login = () => {
  const [showRegister, setShowRegister] = useState(false);
  return (
    <>
      <div className="flex flex-col lg:flex-row lg:justify-around justify-center space-y-3 p-8 lg:mx-20 2xl:mx-60 xl:mx-32 items-center h-screen bg-gray-200">
        <div className="flex flex-col justify-center items-center lg:items-start">
          <img
            className="w-80 mt-6 lg:mt-16"
            src="./assets/images/facebook.svg"
            alt=""
          />
          <p className="font-normal w-[22rem] p-1 text-center lg:text-[2rem] lg:text-left lg:mr-12 text-gray-700 text-2xl lg:w-auto">
            Facebook helps you connect and share with the people in your life
          </p>
        </div>
        <div>
          <LoginForm setShowRegister={setShowRegister} />
          <Link className="w-[22rem] block text-center p-4 cursor-pointer" to="/">
            <span className="font-bold text-md w-80">Create a page</span>
            <sapn className="text-md"> for a celebrity, brand or business </sapn>
          </Link>
        </div>
      </div>
      {showRegister && (

        <div className="absolute inset-0 bg-gray-200 bg-opacity-80 flex items-center justify-center">
          <RegisterForm setShowRegister={setShowRegister} />
        </div>
      )}
    </>
  );
};

export default Login;
