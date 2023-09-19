import './Menu.css';

import { Link } from 'react-router-dom'; // Importe o hook useHistory

function Menu() {
  return (
    <>
      <div className="vertical-container">
        <div className="titulo-container">
          <h1 className="main-title">Tetris</h1>
          <h2 className="subtitle">
            Feito com React{' '}
            <img
              src="icons/react-icon.svg"
              alt="Ícone do React"
              className="tool-icon rotate"
            />
          </h2>
        </div>
        {/* <button className="rounded-button"> */}
        <Link to="/">
          <img src="icons/play-icon.svg" alt="Ícone de play" />
        </Link>
        {/* </button> */}
      </div>
      <footer className="footer-container">
        <a
          href="https://github.com/JosePaulo95/tetris-react"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-link"
        >
          <img src="icons/github-icon.svg" alt="Ícone do GitHub" />
        </a>
        <a
          href="https://twitter.com/paulinhogamedev"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-link"
        >
          <img src="icons/twitter-icon.svg" alt="Ícone do Twitter" />
        </a>
      </footer>
    </>
  );
}
export default Menu;
