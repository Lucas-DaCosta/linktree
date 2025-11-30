import { useNavigate, useParams } from "react-router-dom";
import { type FormEvent } from 'react'
import axios from 'axios'
import Header from "../shared/header";

export function Books() {
  const navigate = useNavigate();
  const { id } = useParams();
  const sendDatas = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    try {
        await axios.post("/api/timeslots",
        {user_email: formData.get("user_email"),
        username: formData.get("username"),
        id_user: Number(id),
        start_date: formData.get("start_date"),
        end_date: formData.get("end_date")
        },
        {withCredentials: true});
      navigate("/");
    } catch (error) {
      console.error(error);
      alert("Identifiants incorrectes"); // à remplacer par une div d'erreur tout en haut de la page
    }
  }
  return (
    <>
    <Header/>
    <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-gray-900 via-gray-800 to-black">
      <div className="w-full max-w-md bg-gray-800 rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center text-white mb-6">
          Réservation
        </h1>
        <form className="space-y-6" onSubmit={sendDatas}>
          <div>
            <label
              htmlFor="text"
              className="block text-sm font-medium text-gray-300"
            >
              Votre nom
            </label>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="John Doe"
              className="mt-2 w-full rounded-lg border border-gray-600 bg-gray-700 text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label
              htmlFor="text"
              className="block text-sm font-medium text-gray-300"
            >
              Adresse email
            </label>
            <input
              type="email"
              name="user_email"
              id="user_email"
              placeholder="example@gmail.com"
              className="mt-2 w-full rounded-lg border border-gray-600 bg-gray-700 text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-300"
            >
              Date de début du RDV
            </label>
            <input
              type="datetime-local"
              name="start_date"
              id="start_date"
              className="mt-2 w-full rounded-lg border border-gray-600 bg-gray-700 text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-300"
            >
              Date de fin du RDV
            </label>
            <input
              type="datetime-local"
              name="end_date"
              id="end_date"
              className="mt-2 w-full rounded-lg border border-gray-600 bg-gray-700 text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white hover:text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
          >
            Prendre Rendez-vous
          </button>
        </form>
      </div>
    </div>
    </>
  );
}

export default Books;