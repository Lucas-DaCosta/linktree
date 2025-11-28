import { useEffect, useState } from 'react'
import axios from 'axios'
import reactLogo from '../public/assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Button from '../components/ui/button' 
import Card from '../components/ui/card' 
import * as user from "../../models/users.ts";

function App() {
  const [count, setCount] = useState(0);
  const [userData, setUserData] = useState<user.User[]>([]);
  const [error, setError] = useState<string>("");
  useEffect(() => {
    axios.get("/api/users/23").then((res) => setUserData(res.data)).catch((err) => {console.log(err); setError("Erreur de requête")})
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
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card2">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <Button>Je suis le bouton</Button>
      <Button>Moi aussi je suis un bouton</Button>
      <Card name='Yanis' email='yanis@sansa.com' phone='0678694521' url='../public/assets/yanis.jpg'></Card>
      <p>Liste des users :</p>
      <ul>{userData.map((user) => (
        <li key={user.id_user}>
          {user.username}
        </li>
      ))}</ul>
    </>
  )
}

export default App
