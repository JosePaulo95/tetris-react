import './Menu.css';

function Menu() {
  return (
    <>
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
      <button className="rounded-button">
        <img src="icons/play-icon.svg" alt="Ícone de play" />
      </button>
      <a
        href="https://github.com/JosePaulo95/tetris-react"
        target="_blank"
        rel="noopener noreferrer"
        className="footer-link"
      >
        <footer className="footer">
          <img src="icons/github-icon.svg" alt="Ícone do git" />
          Desenvolvido por @JosePaulo95
        </footer>
      </a>
    </>
  );
}
export default Menu;
