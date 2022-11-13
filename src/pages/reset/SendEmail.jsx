import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import BLoader from "../../components/ui/BarLoader";
import {
  resetEmailAction,
  resetPasswordCancelAction,
} from "../../redux/actions/resetPasswordAction";

const SendEmail = ({ setVisible }) => {
  const resetPassword = useSelector((state) => state?.resetPassword);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleCancel = () => {
    dispatch(resetPasswordCancelAction());
    setVisible(1);
    navigate("/login");
  };

  const handleSnedMail = () => {
    dispatch(resetEmailAction(resetPassword?.email));
  };

  useEffect(() => {
    if (resetPassword?.mailSuccess) setVisible(3);
  }, [resetPassword?.mailSuccess]);

  return (
    <div className="bg-white lg:w-[600px] sm:w-[500px] p-4 rounded-lg shadow-md">
      {resetPassword?.isLoading && <BLoader isLoading={true} />}
      <h3 className="py-2 text-gray-800 text-xl font-semibold">
        Reset Your Password
      </h3>
      <div className="divider"></div>
      <div className="sm:flex sm:justify-around sm:spacx2 flex flex-col sm:flex-row space-y-8 sm:space-y-0 mt-8">
        <div className="flex flex-col space-y-9 w-56">
          <p className="text-gray-800">
            How do you want to receive the code to reset your password?
          </p>
          <label className="text-gray-800">
            <input
              type="radio"
              name="email"
              className="mr-1"
              defaultChecked={true}
            />
            <span className="text-gray-800 leading-4">
              Send code vial email
            </span>
            <span className="text-gray-800 block pl-5 leading-4">
              {resetPassword?.email}
            </span>
          </label>
        </div>
        <div className="flex flex-col justify-start items-center">
          <img
            className="w-16 h-16 rounded-full object-cover border-2 border-gray-200"
            src={resetPassword?.picture}
            alt=""
          />
          <span className="text-gray-800 text-sm p-1">
            {resetPassword?.email}
          </span>
          <span className="text-gray-800 text-sm font-semibold">
            Facebook User
          </span>
        </div>
      </div>
      {resetPassword?.errorMessage && (
        <div className="p-2 text-center text-red-500 mt-3 font-semibold">
          {resetPassword.errorMessage}
        </div>
      )}
      <div className="mt-8 flex justify-end items-center space-x-6">
        <Link
          className="px-4 py-2 bg-gray-200 rounded-lg cursor-pointer text-gray-700 font-semibold hover:bg-gray-300 transition-colors"
          to="/login"
          onClick={handleCancel}
        >
          No You?
        </Link>
        <button
          onClick={handleSnedMail}
          className="px-4 py-2 rounded-lg bg-blue-600 text-gray-100 font-semibold hover:bg-blue-700 shadow-xl shadow-blue-300 hover:shadow-none transition-colors"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default SendEmail;
