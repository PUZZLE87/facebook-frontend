import { useEffect } from "react";
import { ExclamationCircleIcon } from "@heroicons/react/24/solid";
import ErrorMessage from "../../components/login/ErrorMessage";
import { useFormik } from "formik";
import useScreenSize from "../../hooks/screenSize";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  resetPasswordAction,
  resetPasswordCancelAction,
} from "../../redux/actions/resetPasswordAction";
import BLoader from "../../components/ui/BarLoader";

const SearchAccount = ({ setVisible }) => {
  const resetPassword = useSelector((state) => state.resetPassword);
  const dispatch = useDispatch();
  const { isXL } = useScreenSize();
  const navigate = useNavigate();
  const SearchValidation = Yup.object({
    email: Yup.string()
      .required("Eamil is required")
      .email("Must be a valid email"),
  });

  const handleCancel = () => {
    dispatch(resetPasswordCancelAction());
    setVisible(0);
    navigate("/login");
  };
  const formik = useFormik({
    initialValues: { email: "" },
    validationSchema: SearchValidation,
    onSubmit: (values) => {
      dispatch(resetPasswordAction(values.email));
    },
  });

  useEffect(() => {
    if (resetPassword?.email) {
      setVisible(2);
    }
  }, [resetPassword?.email]);
  return (
    <div className="bg-white shadow-sm p-4 rounded-lg  ">
      {resetPassword?.isLoading && <BLoader isLoading={true} />}
      <h3 className="text-xl text-gray-800 px-4 py-2">Find Your Account</h3>
      <div className="divider"></div>
      <p className="p-4 text-md text-gray-800">
        Please enter your email address to search for your account
      </p>
      <div>
        <form className="space-y-4" onSubmit={formik.handleSubmit}>
          <div className={`${isXL ? "" : "space-y-4"}  relative`}>
            {formik.touched.email && formik.errors.email ? (
              <ErrorMessage
                className="w-28"
                message={formik.errors.email}
                position={isXL ? "left" : ""}
                arrowDir="down"
              />
            ) : null}
            <div className="relative">
              <input
                className={`textInput ${
                  formik.touched.email && formik.errors.email
                    ? "ring-red-400"
                    : ""
                } `}
                id="email"
                name="email"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.email}
                type="email"
                placeholder="Email or phone number"
              />
              {formik.touched.email && formik.errors.email ? (
                <ExclamationCircleIcon className="errorInfo" />
              ) : null}
            </div>
          </div>
          {resetPassword?.errorMessage && (
            <div className="text-red-600 font-semibold p-2 text-center ">
              {resetPassword.errorMessage}
            </div>
          )}
          <div className="divider"></div>
          <div className="flex justify-end items-center space-x-9">
            <Link
              to="/login"
              onClick={handleCancel}
              className="px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors bg-gray-200 text-gray-800"
            >
              Cancel
            </Link>
            <button
              disabled={!(formik.isValid && formik.dirty)}
              type="submit"
              className="px-4 py-2 rounded-lg shadow-blue-300 shadow-xl hover:shadow-none bg-blue-600 hover:bg-blue-700 text-gray-100 transition-colors disabled:bg-blue-300 disabled:cursor-not-allowed disabled:hover:bg-blue-300"
            >
              Search
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SearchAccount;
