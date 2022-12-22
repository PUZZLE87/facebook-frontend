import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { ExclamationCircleIcon } from "@heroicons/react/24/solid";

import { useFormik } from "formik";
import * as Yup from "yup";
import useScreenSize from "../../hooks/screenSize";
import { useDispatch, useSelector } from "react-redux";
import {
  resetCodeAction,
  resetPasswordCancelAction,
} from "../../redux/actions/resetPasswordAction";
import ErrorMessage from "../../components/login/ErrorMessage";
import BLoader from "../../components/ui/BarLoader";

const CodeVerification = ({ setVisible }) => {
  const { isXL } = useScreenSize();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const resetPassword = useSelector((state) => state?.resetPassword);
  const handleCancel = () => {
    dispatch(resetPasswordCancelAction());
    setVisible(0);
    navigate("/login");
  };

  const codeValidation = Yup.object({
    code: Yup.string().required("Code can not be empty"),
  });

  const formik = useFormik({
    initialValues: { code: "" },
    validationSchema: codeValidation,
    onSubmit: (values) => {
      dispatch(resetCodeAction(resetPassword?.email, values.code));
    },
  });

  useEffect(() => {
    if (resetPassword?.code) {
      setVisible(4);
    }
  }, [resetPassword?.code]);
  return (
    <div className="bg-white shadow-sm p-4 rounded-lg  ">
      {resetPassword?.isLoading && <BLoader isLoading={true} />}
      <h3 className="text-xl text-gray-800 px-4 py-2">Code Verification</h3>
      <div className="divider"></div>
      <p className="p-4 text-md text-gray-800">
        Please enter code that been sent to your email
      </p>
      <div>
        <form className="space-y-4" onSubmit={formik.handleSubmit}>
          <div className={`${isXL ? "" : "space-y-4"}  relative`}>
            {formik.touched.code && formik.errors.code ? (
              <ErrorMessage
                className="w-28"
                message={formik.errors.code}
                position={isXL ? "left" : ""}
                arrowDir="down"
              />
            ) : null}
            <div className="relative">
              <input
                className={`textInput ${
                  formik.touched.code && formik.errors.code
                    ? "ring-red-400"
                    : ""
                } `}
                id="code"
                name="code"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.code}
                placeholder="Code"
              />
              {formik.touched.code && formik.errors.code ? (
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
              onClick={handleCancel}
              to="/login"
              className="px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors bg-gray-200 text-gray-800"
            >
              Cancel
            </Link>
            <button
              disabled={!(formik.isValid && formik.dirty)}
              type="submit"
              className="px-4 py-2 rounded-lg shadow-blue-300 shadow-xl hover:shadow-none bg-blue-600 hover:bg-blue-700 text-gray-100 transition-colors disabled:bg-blue-300 disabled:cursor-not-allowed disabled:hover:bg-blue-300"
            >
              Continue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CodeVerification;
