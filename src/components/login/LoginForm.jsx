import { useFormik } from "formik";
import ErrorMessage from "./ErrorMessage";
import { useDispatch, useSelector } from "react-redux";
import loginAction from "../../redux/actions/login";
import useScreenSize from "../../hooks/screenSize";
import * as Yup from "yup";
import { ExclamationCircleIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import BarLoader from "../ui/BarLoader";

const LoginForm = ({ setShowRegister }) => {
  const { isLG } = useScreenSize();
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const loginValidation = Yup.object({
    email: Yup.string()
      .required("Eamil address is required")
      .email("Invalid email address"),
    password: Yup.string().required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginValidation,
    onSubmit: (values) => {
      dispatch(loginAction(values.email, values.password));
    },
  });
  return (
    <div className="shadow-md p-4 rounded-md bg-gray-100">
      <BarLoader isLoading={user?.isLoading} />
      <div className="w-80">
        <form className="space-y-4" onSubmit={formik.handleSubmit}>
          <div className={`${isLG ? "" : "space-y-4"} relative`}>
            {formik.touched.email && formik.errors.email ? (
              <ErrorMessage
                message={formik.errors.email}
                position={isLG ? "left" : ""}
                arrowDir="down"
              />
            ) : null}
            <div className="relative">
              <input
                id="email"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.email}
                className={`textInput ${formik.touched.email && formik.errors.email
                  ? "ring-red-400"
                  : ""
                  }`}
                type="email"
                name="email"
                placeholder="Email address"
              />
              {formik.touched.email && formik.errors.email ? (
                <ExclamationCircleIcon className="errorInfo" />
              ) : null}
            </div>
          </div>
          <div className={`${isLG ? "" : "space-y-4"} relative`}>
            <div className="relative">
              <input
                id="password"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.password}
                className={`textInput ${formik.touched.password && formik.errors.password
                  ? "ring-red-400"
                  : ""
                  }`}
                type="password"
                name="password"
                placeholder="Password"
              />
              {formik.touched.password && formik.errors.password ? (
                <ExclamationCircleIcon className="errorInfo" />
              ) : null}
            </div>
            {formik.touched.password && formik.errors.password ? (
              <ErrorMessage
                message={formik.errors.password}
                position={isLG ? "left" : ""}
                arrowDir="up"
              />
            ) : null}
          </div>
          <button disabled={!(formik.isValid && formik.dirty)}
            className="blue-btn disabled:cursor-not-allowed disabled:opacity-70"
            type="submit"
          >
            Login
          </button>
          {user?.errorMessage ? (<div className="text-red-600 text-center text-md">{user.errorMessage}</div>) : null}
        </form>
        <Link to="/reset" className="block text-center text-blue-500 text-lg hover:underline p-6">
          Forgotten password?
        </Link>
        <div className="divider"></div>
        <div className="flex justify-center items-center p-4 mt-4">
          <button onClick={() => setShowRegister(true)} className="green-btn">
            Create Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
