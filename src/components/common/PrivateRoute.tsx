import Navbar from "components/Navbar";
import { useCurrentUserContext } from "contexts/CurrentUserContext";
import { Navigate, Outlet } from "react-router-dom";

export default function PrivateRoute() {
  const { currentUser } = useCurrentUserContext();

  if (currentUser) {
    return (
      <>
        <Navbar />
        <Outlet />
      </>
    )
  }

  return (
    <Navigate to={"/auth/sign-in"} />
  )
}
