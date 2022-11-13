import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import useScreenSize from "../../hooks/screenSize";
import * as Yup from "yup";
import { useFormik } from "formik";
import {
  resetCodeAction,
  resetPasswordCancelAction,
} from "../../redux/actions/resetPasswordAction";
import ErrorMessage from "../../components/login/ErrorMessage";
import { ExclamationCircleIcon } from "@heroicons/react/24/solid";
import BLoader from "../../components/ui/BarLoader";

const CodeVerification = ({ setVisible }) => {
  const resetPassword = useSelector((state) => state.resetPassword);
  const dispatch = useDispatch();
  const { isXL } = useScreenSize();
  const naviage = useNavigate();
  const codeValidation = Yup.object({
    code: Yup.string().required("code is required"),
  });
  const formik = useFormik({
    initialValues: { code: "" },
    validationSchema: codeValidation,
    onSubmit: (values) => {
      dispatch(resetCodeAction(resetPassword?.email, values.code));
    },
  });

  const handleCancel = () => {
    dispatch(resetPasswordCancelAction());
    setVisible(1);
    naviage("/login");
  };

  useEffect(() => {
    if (resetPassword?.code) setVisible(4);
  }, [resetPassword?.code]);

  return (
    <div className="bg-white shadow-sm p-4 rounded-lg">
      {resetPassword?.isLoading && <BLoader isLoading={true} />}
      <h3 className="text-xl text-gray-800 px-4 py-2">Code Verification</h3>
      <div className="divider"></div>
      <p className="p-4 text-md text-gray-800">
        Pleaser enter code that been sent to your email
      </p>
      <div>
        <form className="space-y-4" onSubmit={formik.handleSubmit}>
          <div className={`${isXL ? "" : "space-y-4"} relative`}>
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
                }`}
                id="code"
                name="code"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.code}
                type="code"
                placeholder="code address"
              />
              {formik.touched.code && formik.errors.code ? (
                <ExclamationCircleIcon className="errorInfo" />
              ) : null}
            </div>
          </div>
          {resetPassword?.errorMessage && (
            <div className="text-red-600 font-semibold p-2 text-center">
              {resetPassword.errorMessage}
            </div>
          )}
          <div className="divider"></div>
          <div className="flex justify-end items-center space-x-9">
            <Link
              className="px-4 py-2 rounded-lg bg-gray-200 text-gray-800 hover:bg-gray-300 transition-colors"
              to="/login"
              onClick={handleCancel}
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={!(formik.isValid && formik.dirty)}
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
