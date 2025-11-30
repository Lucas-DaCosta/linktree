import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import * as user from "../../../models/users.ts"
import * as linktree from "../../../models/linktree.ts"
import Card from "../ui/card.tsx"
import Error404 from "../ui/404.tsx"
import Button from "../ui/button.tsx"
import Header from '../shared/header.tsx'

export default function OtherProfil() {
  const [userData, setUserData] = useState<user.User[]>([]);
  const [links, setlinks] = useState<linktree.Linktree[]>([]);
  const { id } = useParams();
  useEffect(() => {
    axios.get(`/api/users/${id}`, {withCredentials: true}).then((res) => setUserData(res.data)).catch((err) => {console.log(err)})
  }, [id]);
  useEffect(() => {
    axios.get(`/api/linktree/user/${id}`, {withCredentials: true}).then((res) => setlinks(res.data)).catch((err) => {console.log(err)})
  }, [id]);
  const found = userData.length > 0;
  if (!found) {
    return (
        <>
        <Error404> Utilisateur non existant ! </Error404>
        </>
    )
  }

  return (<>
    <Header/>
    <div>
        <Card currentUser={userData[0]} links={links}></Card>
        <a href={`/books/${id}`}><Button> Prendre un rendez-vous </Button></a>
    </div>
    </>
  );
}
