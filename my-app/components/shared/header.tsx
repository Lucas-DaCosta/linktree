import { useEffect, useState } from 'react'
import axios from 'axios'
import * as user from "../../../models/users.ts"

export default function Header() {
  const [userData, setUserData] = useState<user.User[]>([]);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    axios.get("/api/user", {withCredentials: true}).then((res) => setUserData(res.data)).catch((err) => {console.log(err)})
  }, []);
  const isLogged = userData.length > 0;
  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <header className="header bg-gray-800 pb-5 pe-5 ">
      <nav className="nav">
        <a href="/"><img src="/assets/logo.svg" alt="Logo de Linktree" /></a>
        <ul className="nav-links">
          {isLogged && (
            <>
            <li className="user-menu relative">
                <img
                  src={userData[0].avatar ? userData[0].avatar : "/assets/default.webp"}
                  alt="Avatar"
                  onError={(e) => {
                    e.currentTarget.src = "/assets/default.webp";
                  }}
                  className="w-13 h-13 rounded-full cursor-pointer border-2 border-gray-700 hover:opacity-30"
                  onClick={toggleMenu}
                />
            {menuOpen && (
                  <ul className="dropdown-menu absolute top-full mb-2 bg-gray-800 rounded-lg shadow-lg w-48 py-2"  style={{
                  }}>
                    <li className="block px-4 py-2 hover:bg-gray-700">
                      <a href="/profil">Consulter son profil</a>
                    </li>
                    <li className="block px-4 py-2 hover:bg-gray-700">
                      <a href="/profil/edit">Modifier son profil</a>
                    </li>
                    <li className="block px-4 py-2 hover:bg-gray-700">
                      <a href="/slots">Consulter ses crénaux</a>
                    </li>
                  </ul>
            )}
            </li>
            <li> {userData[0].username} </li>
            </>
          )}
          {!isLogged ? <li><a href="/register">Créer un compte</a></li> : ""}
          {!isLogged ? <li><a href="/login">Se connecter</a></li> : ""}
          {isLogged ? <li><a href="/logout">Se déconnecter</a></li> : ""}
        </ul>
      </nav>
    </header>
  );
}
