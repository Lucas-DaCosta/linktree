import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css' 
import Footer from '../components/shared/footer.tsx'
import Header from '../components/shared/header.tsx'
import * as user from "../../models/users.ts"
import Login from "../components/features/login.tsx"

function Accueil() {
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
      <p>Liste des users :</p>
      <ul>{userData.map((user) => (
        <li key={user.id_user}>
          {user.username}
        </li>
      ))}</ul>
    </>
  )
}

function App() {
  return (
    <>
      <Header/>
      <Router>
        <Routes>
          <Route path="/" element={<Accueil />} />
          <Route path="/login" element={<Login />} />
          {/* <Route path="/register" element={<Register />} /> */}
        </Routes>
      </Router>
      <Footer/>
    </>
  )
}

export default App
