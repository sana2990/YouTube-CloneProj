function FilterBar() {
  const categories = [
    "All",
    "React",
    "JavaScript",
    "Node",
    "MongoDB",
    "CSS",
    "Express",
  ];

  return (
    <div
      style={{
        display: "flex",
        gap: "10px",
        padding: "10px",
      }}
    >
      {categories.map((cat) => (
        <button key={cat}>
          {cat}
        </button>
      ))}
    </div>
  );
}

export default FilterBar;