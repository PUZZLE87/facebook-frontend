import { useState } from "react";
import { Link } from "react-router-dom";
import SearchAccount from "./SearchAccount";
import SendEmail from "./SendEmail";
import CodeVerification from "./CodeVerification";
import ChangePassword from "./ChangePassword";

const Reset = () => {
  const [visible, setVisible] = useState(1);
  return (
    <div>
      <div className="fixed z-50 top-0 left-0 bg-white w-full h-14 shadow-md px-6 flex justify-between items-center">
        <img src="/assets/images/facebook.svg" alt="" className="w-32" />
        <Link
          to="/login"
          className="bg-blue-600 py-2 px-4 rounded-lg text-gray-100 font-semibold shadow-sm hover:bg-blue-700 cursor-pointer transition-colors"
        >
          Login
        </Link>
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        {visible === 1 && <SearchAccount setVisible={setVisible} />}
        {visible === 2 && <SendEmail setVisible={setVisible} />}
        {visible === 3 && <CodeVerification setVisible={setVisible} />}
        {visible === 4 && <ChangePassword setVisible={setVisible} />}
      </div>
    </div>
  );
};

export default Reset;
