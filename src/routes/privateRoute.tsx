import { Navigate, Outlet } from "react-router-dom";
import { useCryptoStore } from "@store/useCryptoStore";

const PrivateRoute = () => {
  const { selectedCoinStore } = useCryptoStore();
  return selectedCoinStore ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;
