import { useEffect, useState } from "react";
import axios from "axios";

function ChannelPage() {
  const [videos, setVideos] = useState([]);
  const [title, setTitle] = useState("");
const [description, setDescription] = useState("");
const [videoUrl, setVideoUrl] = useState("");
const [thumbnailUrl, setThumbnailUrl] = useState("");
const [category, setCategory] = useState("");

  const token = localStorage.getItem("token");

    const handleUpload = async (e) => {
  e.preventDefault();

  try {
    const token = localStorage.getItem("token");

    await axios.post(
      "http://localhost:5000/api/videos",
      {
        title,
        description,
        videoUrl,
        thumbnailUrl,
        category,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    alert("Video uploaded successfully");

    // refresh channel videos
    getMyVideos();

    // clear form
    setTitle("");
    setDescription("");
    setVideoUrl("");
    setThumbnailUrl("");
    setCategory("");
  } catch (error) {
    console.log(error);
  }
};

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

  const handleDelete = async (videoId) => {
  try {
    const token = localStorage.getItem("token");

    await axios.delete(
      `http://localhost:5000/api/videos/${videoId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    alert("Video deleted");

    // refresh list
    getMyVideos();
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

      <h2>Upload Video</h2>

<form onSubmit={handleUpload} style={{ marginBottom: "20px" }}>
  <input
    placeholder="Title"
    value={title}
    onChange={(e) => setTitle(e.target.value)}
  />
  <br />

  <input
    placeholder="Description"
    value={description}
    onChange={(e) => setDescription(e.target.value)}
  />
  <br />

  <input
    placeholder="Video URL"
    value={videoUrl}
    onChange={(e) => setVideoUrl(e.target.value)}
  />
  <br />

  <input
    placeholder="Thumbnail URL"
    value={thumbnailUrl}
    onChange={(e) => setThumbnailUrl(e.target.value)}
  />
  <br />

  <input
    placeholder="Category"
    value={category}
    onChange={(e) => setCategory(e.target.value)}
  />
  <br />

  <button type="submit">Upload Video</button>
</form>

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