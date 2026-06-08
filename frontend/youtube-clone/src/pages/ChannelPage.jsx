import { useEffect, useState } from "react";
import axios from "axios";

function ChannelPage() {
  const [videos, setVideos] = useState([]);

  const token = localStorage.getItem("token");

  const getMyVideos = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/videos/my-videos",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setVideos(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMyVideos();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>My Channel</h2>

      {videos.length === 0 ? (
        <p>No videos uploaded yet</p>
      ) : (
        videos.map((video) => (
          <div key={video._id} style={{ marginBottom: "15px" }}>
            <h3>{video.title}</h3>
            <img src={video.thumbnailUrl} width="200" />
            <p>{video.views} views</p>
          </div>
        ))
      )}
    </div>
  );
}

export default ChannelPage;