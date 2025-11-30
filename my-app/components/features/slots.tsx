import { useEffect, useState } from 'react'
import axios from 'axios'
import * as user from "../../../models/users.ts"
import * as getSlots from "../../../models/timeslots.ts"
import Error404 from "../ui/404.tsx"
import Button from "../ui/button.tsx"
import Header from '../shared/header.tsx'
import Timeslots from '../ui/timeslot.tsx'

export default function Slots() {
  const [userData, setUserData] = useState<user.User[]>([]);
  const [slots, setslots] = useState<getSlots.Slot[]>([]);
  useEffect(() => {
    axios.get("/api/user", {withCredentials: true}).then((res) => setUserData(res.data)).catch((err) => {console.log(err)})
  }, []);
  useEffect(() => {
    axios.get("/api/timeslots/user", {withCredentials: true}).then((res) => setslots(res.data)).catch((err) => {console.log(err)})
  }, []);
  const isLogged = userData.length > 0;
  if (!isLogged) {
    return (
        <>
        <Header/>
        <Error404> Vous n'êtes pas connecté ! </Error404>
        </>
    )
  }

  return (
    <>
    <Header/>
    <div>
        <Timeslots slots={slots}/>
        <a href="/timeslots/edit"><Button> Modifier ses crénaux </Button></a>
    </div>
    </>
  );
}
