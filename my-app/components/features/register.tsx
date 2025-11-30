import { useNavigate } from "react-router-dom";
import { type FormEvent } from 'react'
import axios from 'axios'

export function Register() {
  const navigate = useNavigate();
  const sendDatas = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    try {
      if (formData.get("password") !== formData.get("passwordvalidate")) {
        alert("Les mots de passe entrées ne sont pas identiques") // à remplacer par une div d'erreur tout en haut de la page
      } else {
        await axios.post("/api/register",
        {email: formData.get("email"),
        password: formData.get("password"),
        username: formData.get("username"),
        description: formData.get("description"),
        speciality: formData.get("speciality"),
        avatar: formData.get("avatar")
        },
        {withCredentials: true});
      navigate("/");
      }
    } catch (error) {
      console.error(error);
      alert("Identifiants incorrectes"); // à remplacer par une div d'erreur tout en haut de la page
    }
  }
  return (
    <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-gray-900 via-gray-800 to-black">
      <div className="w-full max-w-md bg-gray-800 rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center text-white mb-6">
          Inscription
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
              placeholder="user1"
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
              placeholder="developpeur web front-end"
              className="mt-2 w-full rounded-lg border border-gray-600 bg-gray-700 text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <input
              type="hidden"
              name="avatar"
              id="avatar"
              value=""
              className="mt-2 w-full rounded-lg border border-gray-600 bg-gray-700 text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <input
              type="hidden"
              name="description"
              id="description"
              value="Bio à ajouter"
              className="mt-2 w-full rounded-lg border border-gray-600 bg-gray-700 text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-300"
            >
              Adresse mail
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="exemple@mail.com"
              className="mt-2 w-full rounded-lg border border-gray-600 bg-gray-700 text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-300"
            >
              Mot de passe
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="••••••••"
              className="mt-2 w-full rounded-lg border border-gray-600 bg-gray-700 text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-300"
            >
              Valider le mot de passe
            </label>
            <input
              type="password"
              name="passwordvalidate"
              id="passwordvalidate"
              placeholder="••••••••"
              className="mt-2 w-full rounded-lg border border-gray-600 bg-gray-700 text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white hover:text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
          >
            S'inscrire
          </button>
        </form>

        <p className="mt-6 text-center text-gray-400 text-sm">
          Vous avez déjà un compte ?
          <a href="/login" className="text-blue-400 m-1 hover:underline">
            Connectez-vous
          </a>
        </p>
      </div>
    </div>
  );
}

export default Register;