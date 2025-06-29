import { useState } from "react";

function ThemeToggle() {
  const [dark, setDark] = useState(false);

  const toggleTheme = () => {
    setDark(!dark);
    document.documentElement.classList.toggle("dark", !dark);
  };

  return (
    <button
      onClick={toggleTheme}
      className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-black"
    >
      Toggle Theme 🌗
    </button>
  );
}

export default ThemeToggle;
