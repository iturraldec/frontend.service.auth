import { useAuthContext } from "contexts/authContext";
import { useEffect } from "react";

function Logout() {
  const {logout} = useAuthContext();

  useEffect(() => logout(), []);
  
  return null;
}

export default Logout;