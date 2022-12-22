import ErrorMessage from "../../components/login/ErrorMessage";
import { ExclamationCircleIcon } from "@heroicons/react/24/solid";
import { useFormik } from "formik";
import * as Yup from "yup";
import useScreenSize from "../../hooks/screenSize";
import { useDispatch, useSelector } from "react-redux";
import {
  resetPasswordChangeAction,
  resetPasswordCancelAction,
} from "../../redux/actions/resetPasswordAction";
import { Link, useNavigate } from "react-router-dom";
import BLoader from "../../components/ui/BarLoader";

const ChangePassword = ({ setVisible }) => {
  const { isXL } = useScreenSize();
  const resetPassword = useSelector((state) => state?.resetPassword);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCancel = () => {
    dispatch(resetPasswordCancelAction());
    setVisible(0);
    navigate("/login");
  };

  const formValidation = Yup.object({
    password: Yup.string()
      .required(
        "Enter a combination of alt least eight numbers, letters and punctuation marks (such as ! and &,@)"
      )
      .min(8)
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "password must contain uppercase, lowercase, number and  special character"
      ),
    confirmPassword: Yup.string()
      .required("Confirm your password")
      .oneOf([Yup.ref("password")], "Password must match"),
  });

  const formik = useFormik({
    initialValues: { code: "" },
    validationSchema: formValidation,
    onSubmit: (values) => {
      dispatch(
        resetPasswordChangeAction(
          resetPassword?.email,
          values.password,
          resetPassword?.code
        )
      );
    },
  });

  return (
    <div className="bg-white shadow-sm p-4 rounded-lg w-[320px] sm:w-[380px] xl:w-[500px] lg:w-[400px]">
      {resetPassword?.isLoading && <BLoader isLoading={true} />}
      <h3 className="text-xl text-gray-800 px-4 py-2">Change Password</h3>
      <div className="divider"></div>
      <p className="p-4 text-md text-gray-800">Pick a strong password</p>
      <div>
        <form className="space-y-4" onSubmit={formik.handleSubmit}>
          <div className={`${isXL ? "" : "space-y-4"}  relative`}>
            {formik.touched.password && formik.errors.password ? (
              <ErrorMessage
                className="w-28"
                message={formik.errors.password}
                position={isXL ? "left" : ""}
                arrowDir="down"
              />
            ) : null}
            <div className="relative">
              <input
                className={`textInput ${
                  formik.touched.password && formik.errors.password
                    ? "ring-red-400"
                    : ""
                } `}
                id="password"
                name="password"
                type="password"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.password}
                placeholder="New Password"
              />
              {formik.touched.password && formik.errors.password ? (
                <ExclamationCircleIcon className="errorInfo" />
              ) : null}
            </div>
          </div>
          <div className={`${isXL ? "" : "space-y-4"}  relative`}>
            {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
              <ErrorMessage
                className="w-28"
                message={formik.errors.confirmPassword}
                position={isXL ? "right" : ""}
                arrowDir="down"
              />
            ) : null}
            <div className="relative">
              <input
                className={`textInput ${
                  formik.touched.confirmPassword &&
                  formik.errors.confirmPassword
                    ? "ring-red-400"
                    : ""
                } `}
                id="confirmPassword"
                name="confirmPassword"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.confirmPassword}
                placeholder="Confirm new password"
                type="password"
              />
              {formik.touched.confirmPassword &&
              formik.errors.confirmPassword ? (
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

export default ChangePassword;
