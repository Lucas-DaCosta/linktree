import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import * as user from "../../../models/users.ts"
import * as linktree from "../../../models/linktree.ts"
import Error404 from "../ui/404.tsx"
import { useNavigate } from "react-router-dom";
import Header from '../shared/header.tsx'

export default function DeleteLink() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<user.User[]>([]);
  const [links, setLinks] = useState<linktree.Linktree[]>([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userRes, linkRes] = await Promise.all([
          axios.get(`/api/user`, {withCredentials: true}),
          axios.get(`/api/linktree/${id}`, {withCredentials: true})
        ]);
        
        setUserData(userRes.data);
        setLinks(linkRes.data);
        setLoading(false);
        
        if (userRes.data.length > 0 && linkRes.data.length > 0) {
          if (userRes.data[0].id_user === linkRes.data[0].id_user) {
            await axios.delete(`/api/linktree/${id}`, {withCredentials: true});
            navigate("/profil/edit");
          }
        }
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };
    
    fetchData();
  }, [id, navigate]);

  if (loading) {
    return <div>Chargement...</div>;
  }

  const found = userData.length > 0;
  const foundlink = links.length > 0;

  if (!found || !foundlink) {
    return (
      <>
        <Header/>
        <Error404>Vous n'êtes pas connecté ou le lien que vous souhaitez supprimer n'existe pas !</Error404>
      </>
    )
  }

  if (userData[0].id_user !== links[0].id_user) {
    return (
      <>
        <Header/>
        <Error404>Le lien que vous voulez supprimer ne vous appartient pas !</Error404>
      </>
    )
  }

  return null;
}