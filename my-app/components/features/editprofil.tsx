import { useEffect, useState, type FormEvent} from 'react'
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import * as user from "../../../models/users.ts"
import * as linktree from "../../../models/linktree.ts"
import Error404 from "../ui/404.tsx"
import Button from "../ui/button.tsx"

export default function EditProfil() {
  const navigate = useNavigate();
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

  const sendDatas = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    try {
      const payload: any = {
      username: formData.get("username"),
      description: formData.get("description"),
      speciality: formData.get("speciality"),
      };

      const avatar = formData.get("avatar");
      if (avatar) {
        payload.avatar = avatar;
      }
      await axios.put(`/api/users/${userData[0].id_user}`,
        payload,
        {withCredentials: true});
      navigate("/");
    } catch (error) {
      console.error(error);
      alert("Erreur de modification, un champ est peut-être trop long"); // à remplacer par une div d'erreur tout en haut de la page
    }
  }
  return (
    <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-gray-900 via-gray-800 to-black">
      <div className="w-full max-w-md bg-gray-800 rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center text-white mb-6">
          Modifier son profil
        </h1>
        <form className="space-y-6" onSubmit={sendDatas}>
          <div>
            <label
              htmlFor="text"
              className="block text-sm font-medium text-gray-300"
            >
              Nom d'utilisateur
            </label>
            <input
              type="text"
              name="username"
              id="username"
              defaultValue={userData[0].username}
              className="mt-2 w-full rounded-lg border border-gray-600 bg-gray-700 text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label
              htmlFor="text"
              className="block text-sm font-medium text-gray-300"
            >
              Spécialité
            </label>
            <input
              type="text"
              name="speciality"
              id="speciality"
              defaultValue={userData[0].speciality}
              className="mt-2 w-full rounded-lg border border-gray-600 bg-gray-700 text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label
              htmlFor="text"
              className="block text-sm font-medium text-gray-300"
            >
              Bio / description
            </label>
            <input
              type="text"
              name="description"
              id="description"
              defaultValue={userData[0].description}
              className="mt-2 w-full rounded-lg border border-gray-600 bg-gray-700 text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label
              htmlFor="text"
              className="block text-sm font-medium text-gray-300"
            >
              Lien de l'image pour votre avatar
            </label>
            <input
              type="text"
              name="avatar"
              id="avatar"
              defaultValue={userData[0].avatar}
              placeholder='https://m.media-amazon.com/images/I/4156VVpj5XL._AC_UF1000,1000_QL80_.jpg'
              className="mt-2 w-full rounded-lg border border-gray-600 bg-gray-700 text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white hover:text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
          >
            Modifier son profil
          </button>
        </form>
      </div>
    </div>
  );
}
