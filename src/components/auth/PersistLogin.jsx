import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import newAccessTokenAction from "../../redux/actions/newAccessToken";
import { useEffect } from "react";
import BLoader from "../ui/BarLoader";

const PersistLogin = () => {
  const user = useSelector((state) => state.user);
  const newAccessToken = useSelector((state) => state.newAccessToken);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user?.accessToken) dispatch(newAccessTokenAction());
  }, []);

  if (newAccessToken?.errorMessage) {
    navigate("/login");
  }

  return (
    <>
      <BLoader isLoading={newAccessToken?.isLoading} />
      {user?.accessToken && <Outlet />}
    </>
  );
};

export default PersistLogin;
