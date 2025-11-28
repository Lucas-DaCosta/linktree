import linktreeLogo from '../../public/assets/logo.svg'

export default function Header() {
  return (
    <header className="header">
      <nav className="nav">
        <a href="/"><img src={linktreeLogo} alt="Logo de Linktree" /></a>
        <ul className="nav-links">
          <li><a href="/">Accueil</a></li>
          <li><a href="/register">Créer un compte</a></li>
          <li><a href="/login">Se connecter</a></li>
          <li><a href="/contact">Contact</a></li>
        </ul>
      </nav>
    </header>
  );
}
