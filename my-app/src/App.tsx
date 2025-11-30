import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css' 
import Footer from '../components/shared/footer.tsx'
import Header from '../components/shared/header.tsx'
import Card from '../components/ui/card.tsx'
import * as user from "../../models/users.ts"
import Login from "../components/features/login.tsx"
import Register from "../components/features/register.tsx"
import Logout from "../components/features/logout.tsx"
import Profil from "../components/features/profil.tsx"
import OtherProfil from "../components/features/otherprofil.tsx"
import EditProfil from "../components/features/editprofil.tsx"

function Accueil() {
  const [userData, setUserData] = useState<user.User[]>([]);
  useEffect(() => {
    axios.get("/api/users").then((res) => setUserData(res.data)).catch((err) => {console.log(err); console.log(err)})
  }, []);
  return (
    <>
      <div className="grid gap-4
                      grid-cols-1
                      sm:grid-cols-2
                      md:grid-cols-3
                      lg:grid-cols-4
                      "> 
      {userData.map((user) => (
        <a className="hover:opacity-50 no-underline " key={user.id_user} href={`/profil/${user.id_user}`}>
          <Card currentUser={user} cut={true}></Card>
        </a>
      ))}
      </div>
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
          <Route path="/register" element={<Register />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/profil" element={<Profil />} />
          <Route path="/profil/edit" element={<EditProfil />} />
          <Route path="/profil/:id" element={<OtherProfil />} />
        </Routes>
      </Router>
      <Footer/>
    </>
  )
}

export default App
