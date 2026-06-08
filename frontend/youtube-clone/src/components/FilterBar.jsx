function FilterBar({
  category,
  setCategory,
}) {
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
        <button
          key={cat}
          onClick={() =>
            setCategory(
              cat === "All" ? "" : cat
            )
          }
        >
          {cat}
        </button>
      ))}
    </div>
  );
}

export default FilterBar;