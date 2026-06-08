import { useNavigate } from "react-router-dom";

function VideoCard({ video }) {
    const navigate =
    useNavigate();

  return (
    <div onClick={() =>
        navigate(
          `/video/${video._id}`
        )
      }
      style={{
        width: "300px",
        margin: "15px",
        border: "1px solid #ddd",
        borderRadius: "10px",
        overflow: "hidden",
      }}
    >
      <img
        src={video.thumbnailUrl}
        alt={video.title}
        style={{
          width: "100%",
          height: "180px",
          objectFit: "cover",
        }}
      />

      <div style={{ padding: "10px" }}>
        <h3>{video.title}</h3>

        <p>{video.views} views</p>

        <p>{video.category}</p>
      </div>
    </div>
  );
}

export default VideoCard;