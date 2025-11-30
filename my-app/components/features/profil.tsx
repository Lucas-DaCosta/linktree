import { useEffect, useState } from 'react'
import axios from 'axios'
import * as user from "../../../models/users.ts"
import * as linktree from "../../../models/linktree.ts"
import Card from "../ui/card.tsx"
import Error404 from "../ui/404.tsx"
import Button from "../ui/button.tsx"

export default function Profil() {
  const [userData, setUserData] = useState<user.User[]>([]);
  const [links, setlinks] = useState<linktree.Linktree[]>([]);
  useEffect(() => {
    axios.get("/api/user", {withCredentials: true}).then((res) => setUserData(res.data)).catch((err) => {console.log(err)})
  }, []);
  useEffect(() => {
    axios.get("/api/linktree/user", {withCredentials: true}).then((res) => setlinks(res.data)).catch((err) => {console.log(err)})
  }, []);
  const isLogged = userData.length > 0;
  if (!isLogged) {
    return (
        <>
        <Error404> Vous n'êtes pas connecté ! </Error404>
        </>
    )
  }

  return (
    <div>
        <Card currentUser={userData[0]} links={links}></Card>
        <a href="/profil/edit"><Button> Modifier le profil </Button></a>
    </div>
  );
}
