import './Menu.css'

import { Link } from 'react-router-dom' // Importe o hook useHistory

function Menu() {
  return (
    <>
      <div className="vertical-container">
        <div className="titulo-container">
          <h1 className="main-title">Tetris</h1>
          <h2 className="subtitle">
            Feito com React{' '}
            <img
              alt="Ícone do React"
              className="tool-icon rotate"
              src="icons/react-icon.svg"
            />
          </h2>
        </div>
        {/* <button className="rounded-button"> */}
        <Link to="/play">
          <img alt="Ícone de play" src="icons/play-icon.svg" />
        </Link>
        {/* </button> */}
      </div>
      <footer className="footer-container">
        <a
          className="footer-link"
          href="https://github.com/JosePaulo95/tetris-react"
          rel="noopener noreferrer"
          target="_blank"
        >
          <img alt="Ícone do GitHub" src="icons/github-icon.svg" />
        </a>
        <a
          className="footer-link"
          href="https://twitter.com/paulinhogamedev"
          rel="noopener noreferrer"
          target="_blank"
        >
          <img alt="Ícone do Twitter" src="icons/twitter-icon.svg" />
        </a>
      </footer>
    </>
  )
}
export default Menu
