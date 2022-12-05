import { useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const SendVerification = () => {
  const [success, setSuccess] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const axiosPrivate = useAxiosPrivate();

  const sendVerificationEmail = async () => {
    try {
      const { data } = await axiosPrivate.post("/user/sendVerification");
      setSuccess(data.message);
    } catch (error) {
      if (!error?.response) {
        setErrorMsg("Server not respond");
      } else if (error?.response.data.message) {
        setErrorMsg(error?.response.data.message);
      } else {
        setErrorMsg("Fialed to send activation email");
      }
    }
  };

  return (
    <div className="flex items-center justify-center w-full mt-3">
      <div className="bg-white p-4 text-lg rounded-lg shadow-md w-full">
        <p className="text-gray-800 p-1">
          Your account is not verified. verify your account before it gets
          deleted after a month from creating
        </p>
        <span
          className="p-1 text-blue-500 hover:text-blue-600 transition-colors cursor-pointer hover:underline"
          onClick={() => sendVerificationEmail()}
        >
          Click here to resend verification link{" "}
        </span>
        {success && (
          <div className="text-green-600 p-1 font-semibold">{success}</div>
        )}
        {errorMsg && (
          <div className="text-red-600 p-1 font-semibold">{errorMsg}</div>
        )}
      </div>
    </div>
  );
};

export default SendVerification;
