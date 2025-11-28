import { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css' 
import Footer from '../components/shared/footer.tsx'
import Header from '../components/shared/header.tsx'
import * as user from "../../models/users.ts"

function App() {
  const [userData, setUserData] = useState<user.User[]>([]);
  const [error, setError] = useState<string>("");
  useEffect(() => {
    axios.get("/api/users").then((res) => setUserData(res.data)).catch((err) => {console.log(err); setError("Erreur de requête")})
  }, []);
  if (error) {
    return (
      <>
       <p> {error} </p>
      </>
    )
  }
  return (
    <>
      <Header/>
      <p>Liste des users :</p>
      <ul>{userData.map((user) => (
        <li key={user.id_user}>
          {user.username}
        </li>
      ))}</ul>
      <Footer/>
    </>
  )
}

export default App
