import { useAuth } from "../context/auth";
import Dashboard from "./Dashboard";
import Profiles from "./Profiles";

const Home = () => {
  const { currentUser } = useAuth();
  console.log("current", currentUser);
  return <>{currentUser.isAdmin ? <Dashboard /> : <Profiles />}</>;
};

export default Home;
