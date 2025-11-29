import { useEffect, useState } from 'react'
import axios from 'axios'
import * as user from "../../../models/users.ts"

export default function Header() {
  const [userData, setUserData] = useState<user.User[]>([]);
  useEffect(() => {
    axios.get("/api/user", {withCredentials: true}).then((res) => setUserData(res.data)).catch((err) => {console.log(err)})
  }, []);
  const isLogged = userData.length;
  return (
    <header className="header">
      <nav className="nav">
        <a href="/"><img src="/assets/logo.svg" alt="Logo de Linktree" /></a>
        <ul className="nav-links">
          <li> {isLogged ? userData[0].username : ""} </li>
          <li><a href="/">Accueil</a></li>
          {!isLogged ? <li><a href="/register">Créer un compte</a></li> : ""}
          {!isLogged ? <li><a href="/login">Se connecter</a></li> : ""}
          {isLogged ? <li><a href="/logout">Se déconnecter</a></li> : ""}
          <li><a href="/contact">Contact</a></li>
        </ul>
      </nav>
    </header>
  );
}
