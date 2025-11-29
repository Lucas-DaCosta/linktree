import * as user from "../../../models/users.ts";
import * as linktree from "../../../models/linktree.ts";
interface CardProps {
  currentUser: user.User;
  links?: linktree.Linktree[];
}

export default function Card({ currentUser, links }: CardProps) {
  const logos: Record<string, string> = {"youtube": "/assets/youtube.svg",
    "github": "/assets/github.svg",
    "linkedin": "/assets/linkedin.svg"
  }
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden max-w-sm mx-auto my-4">
      <div className="flex items-center space-x-4 p-4 bg-gray-100">
        <img
          src={currentUser.avatar ? currentUser.avatar : "/assets/default.webp"}
          alt={"Avatar de " + currentUser.username}
          className="w-16 h-16 rounded-full border-2 border-gray-300"
        />
        <div>
          <h2 className="text-lg font-semibold">{currentUser.username}</h2>
          <h3 className="text-sm text-gray-600">{currentUser.speciality}</h3>
        </div>
      </div>

      <div className="p-4 border-t border-gray-200">
        <p className="text-gray-700">{currentUser.description}</p>
      </div>

      {links && links.length > 0 && (
        <div className="p-4 border-t border-gray-200 flex flex-col space-y-2">
          {links.map((link) => (
            <a
              key={link.id_link || link.url}
              href={link.url}
              className="flex items-center space-x-2 text-blue-500 hover:underline"
            >
              {Object.hasOwn(logos, link.logo) && (<img src={logos[link.logo]} alt={link.name} className="w-5 h-5" />)}
              <span>{link.name}</span>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
