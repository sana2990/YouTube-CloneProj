import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setUser(null);

    navigate("/login");
  };

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "15px",
        borderBottom: "1px solid #ddd",
      }}
    >
      <h2 onClick={() => navigate("/")}>
        YouTube Clone
      </h2>

      <input
        type="text"
        placeholder="Search videos..."
        style={{ width: "300px", padding: "6px" }}
      />

      <div>
        {user ? (
          <>
            <span style={{ marginRight: "10px" }}>
              Welcome {user.username}
            </span>

            <button onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <button onClick={() => navigate("/login")}>
            Sign In
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;