import { PropagateLoader } from "react-spinners";
import useClickOutside from "../../hooks/useClickOutside";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import verifyAction from "../../redux/actions/verifyAction";

const ActivateModal = ({ token = "" }) => {
  console.log(token);
  const [showModal, setShowModal] = useState(!!token);
  const modalRef = useRef(null);
  const axiosPrivate = useAxiosPrivate();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const verifyAccount = useSelector((state) => state?.verifyAccount);

  useEffect(() => {
    if (token) dispatch(verifyAction(token, axiosPrivate));
    console.log("OK");
    const timerId = setTimeout(() => {
      navigate("/");
    }, 3000);
    return () => clearTimeout(timerId);
  }, []);

  useClickOutside(modalRef, () => {
    setShowModal(false);
  });

  return (
    <>
      {showModal && (
        <div className="absolute inset-0 flex items-center justify-center  bg-gray-200 bg-opacity-90 z-10">
          <div
            ref={modalRef}
            className="w-80 h-52 flex flex-col items-center rounded-lg shadow-md  bg-white "
          >
            <p
              className={`p-3 font-semibold text-lg ${
                verifyAccount?.errorMessage ? "text-red-600" : "text-green-600"
              } `}
            >
              {verifyAccount?.errorMessage
                ? "Account verification failed"
                : "Account verification succeded"}
            </p>
            <div className="divider"></div>
            <p className="p-3 mt-2 text-md text-center text-gray-800">
              {verifyAccount?.errorMessage
                ? "Account verification failed"
                : "Account Accounst has been activated successfully "}
            </p>
            <div className="mt-6">
              <PropagateLoader
                loading={true}
                color={verifyAccount?.errorMessage ? "#EA2027" : "#2ecc71"}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ActivateModal;
