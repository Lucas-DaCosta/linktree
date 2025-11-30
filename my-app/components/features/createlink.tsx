import { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import * as user from "../../../models/users.ts"
import Error404 from "../ui/404.tsx"
import { useNavigate } from "react-router-dom";
import Header from '../shared/header.tsx'

export default function CreateLink() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<user.User[]>([]);
  const hasCreated = useRef(false);

  useEffect(() => {
    if (hasCreated.current) return;
    const fetchData = async () => {
      try {
        const userRes = await axios.get(`/api/user`, {withCredentials: true});
        setUserData(userRes.data);
        await axios.post(`/api/linktree`, {
            name: "nom",
            logo: "youtube",
            url: "http://www.youtube.com"
        },
        {withCredentials: true});
        navigate("/profil/edit");
      } catch (err) {
        console.log(err);
      }
    };
    
    fetchData();
  }, [navigate]);

  const found = userData.length > 0;

  if (!found) {
    return (
      <>
        <Header/>
        <Error404>Vous n'êtes pas connecté !</Error404>
      </>
    )
  }

  return null;
}