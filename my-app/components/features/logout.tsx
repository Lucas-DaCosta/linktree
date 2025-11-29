import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from 'axios'

export function Logout() {
  const navigate = useNavigate();
  useEffect(() =>  {
    const logout = async () =>  {
        await axios.get("/api/logout", {withCredentials: true});
        navigate("/");
    }
    logout();
  }, []);
  return null;
}

export default Logout;