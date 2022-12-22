import { useFormik } from "formik";
import * as Yup from "yup";
import ErrorMessage from "./ErrorMessage";
import useScreenSize from "../../hooks/screenSize";
import { XMarkIcon } from "@heroicons/react/24/outline";
import BarLoader from "../ui/BarLoader";
import registerAction from "../../redux/actions/register";
import { useSelector, useDispatch } from "react-redux";
import {
  ExclamationCircleIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/24/solid";

// register a new user form
const RegisterForm = ({ showRegister }) => {
  const { isLG } = useScreenSize();
  const register = useSelector((state) => state.register);
  const dispatch = useDispatch();
  const registerValidation = Yup.object({
    first_name: Yup.string()
      .required("What's your first name?")
      .min(4, " Must be at least 4 characters"),
    last_name: Yup.string()
      .required("What's your last name?")
      .min(4, "Must be at least 4 characters"),
    email: Yup.string()
      .required(
        "You'll need this when you log in and if you ever need to reset your password"
      )
      .email("Invalid email address"),
    password: Yup.string()
      .required(
        "Enter a combination of alt least eight numbers, letters and punctuation marks (such as ! and &,@)"
      )
      .min(8)
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "password must contain uppercase, lowercase, number and  special character"
      ),
  });

  const tempDate = new Date().getFullYear() - 18;

  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      bYear: tempDate,
      bMonth: new Date().getMonth() + 1,
      bDay: new Date().getDate(),
      gender: "male",
    },
    validationSchema: registerValidation,
    onSubmit: (values) => {
      dispatch(registerAction(values));
    },
  });

  const years = Array.from(
    new Array(tempDate - 1950),
    (_, index) => tempDate - index
  );

  const months = Array.from(new Array(12), (_, index) => 1 + index);
  const getDays = () => {
    return new Date(formik.values.bYear, formik.values.bMonth, 0).getDate();
  };
  const days = Array.from(new Array(getDays()), (_, index) => 1 + index);

  return (
    <div className="bg-white rounded-md m-4  p-4">
      <BarLoader isLoading={register?.isLoading} />
      <div className="w-[22rem]">
        <div className="flex justify-between items-center mb-2 px-2">
          <h2 className="text-[2rem] font-bold text-gray-600 ">Sign Up</h2>
          <span
            className="cursor-pointer hover:bg-red-200 transition-colors bg-gray-200 rounded-full "
            onClick={() => showRegister(false)}
          >
            <XMarkIcon className="w-6 p-1 transition-colors text-red-400   hover:text-red-600" />
          </span>
        </div>
        <div className="divider"></div>
        <form className="p-2 mt-2 space-y-3" onSubmit={formik.handleSubmit}>
          <div className="space-y-3 lg:space-y-0 lg:space-x-3 lg:flex lg:items-center lg:justify-between">
            <div className={`${isLG ? "" : "space-y-4"}  relative`}>
              <div className="relative">
                <input
                  className={`textInput ${
                    formik.touched.first_name && formik.errors.first_name
                      ? "ring-red-400"
                      : ""
                  } `}
                  id="first_name"
                  name="first_name"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.first_name}
                  type="text"
                  placeholder="First name"
                />
                {formik.touched.first_name && formik.errors.first_name ? (
                  <ExclamationCircleIcon className="errorInfo" />
                ) : null}
              </div>
              {formik.touched.first_name && formik.errors.first_name ? (
                <ErrorMessage
                  message={formik.errors.first_name}
                  position={isLG ? "left" : ""}
                  arrowDir="up"
                />
              ) : null}
            </div>
            <div className={`${isLG ? "" : "space-y-4"}  relative`}>
              <div className="relative">
                <input
                  className={`textInput ${
                    formik.touched.last_name && formik.errors.last_name
                      ? "ring-red-400"
                      : ""
                  } `}
                  id="last_name"
                  name="last_name"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.last_name}
                  type="text"
                  placeholder="Last name"
                />
                {formik.touched.last_name && formik.errors.last_name ? (
                  <ExclamationCircleIcon className="errorInfo" />
                ) : null}
              </div>
              {formik.touched.last_name && formik.errors.last_name ? (
                <ErrorMessage
                  message={formik.errors.last_name}
                  position={isLG ? "right" : ""}
                  arrowDir="up"
                />
              ) : null}
            </div>
          </div>
          <div className={`${isLG ? "" : "space-y-4"}  relative`}>
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
                placeholder="Email address"
              />
              {formik.touched.email && formik.errors.email ? (
                <ExclamationCircleIcon className="errorInfo" />
              ) : null}
            </div>
            {formik.touched.email && formik.errors.email ? (
              <ErrorMessage
                message={formik.errors.email}
                position={isLG ? "left" : ""}
                arrowDir="up"
              />
            ) : null}
          </div>
          <div className={`${isLG ? "" : "space-y-4"}  relative`}>
            <div className="relative">
              <input
                className={`textInput ${
                  formik.touched.password && formik.errors.password
                    ? "ring-red-400"
                    : ""
                } `}
                id="password"
                name="password"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.password}
                type="password"
                placeholder="Password"
              />
              {formik.touched.password && formik.errors.password ? (
                <ExclamationCircleIcon className="errorInfo" />
              ) : null}
            </div>
            {formik.touched.password && formik.errors.password ? (
              <ErrorMessage
                message={formik.errors.password}
                position={isLG ? "right" : ""}
                arrowDir="up"
              />
            ) : null}
          </div>
          <div>
            <div className="flex space-x-1 items-center ">
              <span className="text-gray-500 text-lg"> Date of birth </span>
              <QuestionMarkCircleIcon className="w-5 text-gray-500 " />
            </div>
            <div className="flex justify-around mt-2">
              <select
                name="bDay"
                id="bDay"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.bDay}
                className="w-24 rounded-lg text-lg border-gray-500 text-gray-500 font-semibold ring-0 border-2"
              >
                {days.map((day, index) => (
                  <option value={day} key={index}>
                    {day}
                  </option>
                ))}
              </select>

              <select
                name="bMonth"
                id="bMonth"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.bMonth}
                className="w-24 rounded-lg text-lg border-gray-500 text-gray-500 font-semibold ring-0 border-2"
              >
                {months.map((month, index) => (
                  <option value={month} key={index}>
                    {month}
                  </option>
                ))}
              </select>
              <select
                name="bYear"
                id="bYear"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.bYear}
                className="w-24 rounded-lg text-lg border-gray-500 text-gray-500 font-semibold ring-0 border-2"
              >
                {years.map((year, index) => (
                  <option value={year} key={index}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <div className="text-lg text-gray-500 flex items-center space-x-1">
              <span> Gender </span>
              <QuestionMarkCircleIcon className="w-5" />
            </div>
            <div className="flex justify-around">
              <label
                className="border-gray-500 w-24 px-2 py-2 rounded-lg border-2 text-gray-500 text-lg flex items-center justify-between "
                htmlFor="male"
              >
                Male
                <input
                  className="bg-gray-200 border-2 focus:ring-0"
                  type="radio"
                  name="gender"
                  id="male"
                  value="male"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  defaultChecked={true}
                />
              </label>
              <label
                className="border-gray-500 w-24 px-2 py-2 rounded-lg border-2 text-gray-500 text-lg flex items-center justify-between "
                htmlFor="female"
              >
                Female
                <input
                  className="bg-gray-200 border-2 focus:ring-0"
                  type="radio"
                  name="gender"
                  id="female"
                  value="female"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </label>
              <label
                className="border-gray-500 w-24 px-2 py-2 rounded-lg border-2 text-gray-500 text-lg flex items-center justify-between "
                htmlFor="custom"
              >
                Custom
                <input
                  className="bg-gray-200 border-2 focus:ring-0"
                  type="radio"
                  name="gender"
                  id="custom"
                  value="custom"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </label>
            </div>
          </div>
          <p className="text-sm p-2 text-gray-500 ">
            By clicking Sign Up, you agree to our{" "}
            <span className="text-blue-500">Terms, Data Policy</span> and{" "}
            <span className="text-blue-500">Cookie Policy</span>. You may
            receive SMS notifications from us and can opt out at any time.
          </p>
          {register?.errorMessage && (
            <p className=" text-center text-red-500 text-lg p-1">
              {register?.errorMessage}
            </p>
          )}
          <div className="text-center">
            <button
              disabled={!(formik.isValid && formik.dirty)}
              className="text-gray-100 bg-green-600 w-44 shadow-green-600 shadow-2xl py-2 text-xl font-semibold rounded-lg hover:shadow-none transition-colors hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-green-300 "
              type="submit"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
