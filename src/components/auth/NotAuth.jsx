import { Navigate, Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import newAccessTokenAction from "../../redux/actions/newAccessToken";

const NotAuth = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user?.accessToken) dispatch(newAccessTokenAction());
  }, []);

  return user?.accessToken ? <Navigate to="/" /> : <Outlet />;
};

export default NotAuth;
