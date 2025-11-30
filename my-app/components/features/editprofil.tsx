import { useEffect, useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import * as user from "../../../models/users.ts";
import * as linktree from "../../../models/linktree.ts";
import Error404 from "../ui/404.tsx";
import Header from "../shared/header.tsx";

export default function EditProfil() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<user.User[]>([]);
  const [links, setLinks] = useState<linktree.Linktree[]>([]);

  useEffect(() => {
    axios
      .get("/api/user", { withCredentials: true })
      .then((res) => setUserData(res.data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get("/api/linktree/user", { withCredentials: true })
      .then((res) => setLinks(res.data))
      .catch((err) => console.log(err));
  }, []);

  const isLogged = userData.length > 0;
  if (!isLogged) {
    return (
      <>
        <Error404> Vous n'êtes pas connecté ! </Error404>
      </>
    );
  }

  const sendDatas = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    try {
      const useredits: any = {
        username: formData.get("username"),
        description: formData.get("description"),
        speciality: formData.get("speciality"),
      };

      const avatar = formData.get("avatar");
      if (avatar) useredits.avatar = avatar;

      await axios.put(`/api/users/${userData[0].id_user}`, useredits, {
        withCredentials: true,
      });

      for (const link of links) {
        const linkedits = {
          name: formData.get(`name-${link.id_link}`),
          logo: formData.get(`logo-${link.id_link}`),
          url: formData.get(`url-${link.id_link}`),
        };

        await axios.put(`/api/linktree/${link.id_link}`, linkedits, {
          withCredentials: true,
        });
      }

      navigate("/");
    } catch (error) {
      console.error(error);
      alert("Erreur de modification, un champ est peut-être trop long");
    }
  };

  return (
    <>
      <Header />
      <div className="flex m-5 items-center justify-center ">
        <div className="w-full max-w-1/2 bg-gray-800 rounded-xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-center text-white mb-6">
            Modifier son profil
          </h1>

          <form className="space-y-6" onSubmit={sendDatas}>
            <div>
              <label className="block text-sm font-medium text-gray-300">
                Nom d'utilisateur
              </label>
              <input
                type="text"
                name="username"
                defaultValue={userData[0].username}
                className="mt-2 w-full rounded-lg border border-gray-600 bg-gray-700 
                           text-white px-4 py-2 focus:outline-none focus:ring-2 
                           focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300">
                Spécialité
              </label>
              <input
                type="text"
                name="speciality"
                defaultValue={userData[0].speciality}
                className="mt-2 w-full rounded-lg border border-gray-600 bg-gray-700 
                           text-white px-4 py-2 focus:outline-none focus:ring-2 
                           focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300">
                Bio / description
              </label>
              <input
                type="text"
                name="description"
                defaultValue={userData[0].description}
                className="mt-2 w-full rounded-lg border border-gray-600 bg-gray-700 
                           text-white px-4 py-2 focus:outline-none focus:ring-2 
                           focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300">
                Lien de l'image pour votre avatar
              </label>
              <input
                type="text"
                name="avatar"
                defaultValue={userData[0].avatar}
                placeholder="https://image.com/avatar.jpg"
                className="mt-2 w-full rounded-lg border border-gray-600 bg-gray-700 
                           text-white px-4 py-2 focus:outline-none focus:ring-2 
                           focus:ring-blue-500"
              />
            </div>

            {links.length > 0 && (
              <div className="p-4 border-gray-600 border-2 rounded-lg space-y-4">
                <h2 className="text-white text-xl font-semibold">
                  Vos liens Linktree
                </h2>
                <a href="/link/create">
                      <button
                      type="button"
                      className=" w-1/4 bg-green-500 hover:bg-green-700 text-white 
                         font-semibold py-2 px-4 rounded-lg transition duration-300 m-3"
                      >
                        +
                      </button>
                </a>

                {links.map((link) => (
                  <div
                    key={link.id_link}
                    className="p-3 bg-gray-700 rounded-lg space-y-2"
                  >
                    {Object.hasOwn(linktree.logos, link.logo) && (
                      <img
                        src={linktree.logos[link.logo]}
                        alt={link.name}
                        className="w-6 h-6 mb-1"
                      />
                    )}

                    <input
                      type="text"
                      name={`name-${link.id_link}`}
                      defaultValue={link.name}
                      className="w-full rounded-lg border border-gray-600 bg-gray-800 
                                 text-white px-3 py-1"
                      placeholder="Nom du lien"
                    />

                    <select
                      name={`logo-${link.id_link}`}
                      defaultValue={link.logo}
                      className="w-full rounded-lg border border-gray-600 bg-gray-800 
                                 text-white px-3 py-1"
                    >
                      {Object.keys(linktree.logos).map((logo) => (
                        logo === link.logo ? <option defaultValue={logo}> {logo} </option> : <option value={logo}>
                          {logo} 
                        </option>
                      ))}
                    </select>

                    <input
                      type="text"
                      name={`url-${link.id_link}`}
                      defaultValue={link.url}
                      className="w-full rounded-lg border border-gray-600 bg-gray-800 
                                 text-white px-3 py-1"
                      placeholder="URL"
                    />
                    <a href={"/link/delete/" + link.id_link}>
                      <button
                      type="button"
                      className="w-full bg-red-500 hover:bg-red-700 text-white 
                         font-semibold py-2 px-4 rounded-lg transition duration-300"
                      >
                        Supprimer
                      </button>
                    </a>
                  </div>
              ))}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white 
                         font-semibold py-2 px-4 rounded-lg transition duration-300"
            >
              Modifier son profil
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
