import { useTheme } from "../hooks/useTheme";

export default function Header() {
  const [isDark, setDark] = useTheme();

  return (
    <header className={`header-container ${isDark ? "dark" : ""}`}>
      <div className="header-content">
        <h2 className="title">
          <a href="/">Where in the world?</a>
        </h2>
        <p
          className="theme-changer"
          onClick={() => {
            setDark(!isDark);
            localStorage.setItem("isDark", !isDark);
          }}
        >
          <i className={`fa-solid ${isDark ? "fa-sun" : "fa-moon"}`}></i>
          &nbsp;&nbsp;{isDark ? "Light" : "Dark"} Mode
        </p>
      </div>
    </header>
  );
}
