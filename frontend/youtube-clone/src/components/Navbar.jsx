function Navbar() {
  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "15px",
        borderBottom: "1px solid #ddd",
      }}
    >
      <h2>YouTube Clone</h2>

      <input
        type="text"
        placeholder="Search videos..."
        style={{
          width: "400px",
          padding: "8px",
        }}
      />

      <button>
        Sign In
      </button>
    </nav>
  );
}

export default Navbar;