import { Outlet, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import newAccessTokenAction from "../../redux/actions/newAccessToken";
import { useEffect } from "react";
import BLoader from "../ui/BarLoader";

const PersisLogin = () => {
  const user = useSelector((state) => state.user);
  const newAccessToken = useSelector((state) => state.newAccessToken);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(user);
    if (!user?.accessToken) dispatch(newAccessTokenAction());
  }, []);

  return (
    <>
      {!user?.accessToken && <Navigate to="/login" />}
      <BLoader isLoading={newAccessToken?.isLoading} />
      {user?.accessToken && <Outlet />}
    </>
  );
};
export default PersisLogin;
