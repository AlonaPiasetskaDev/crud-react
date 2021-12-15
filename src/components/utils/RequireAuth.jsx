import Authorization from "../Auth";
import { useAuth } from "../../context/auth";

const RequireAuth = ({ children }) => {
  const { signed } = useAuth();
  return signed ? children : <Authorization />;
};

export default RequireAuth;
