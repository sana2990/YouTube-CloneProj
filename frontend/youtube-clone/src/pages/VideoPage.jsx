import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getVideoById } from "../services/videoService";
import CommentSection from "../components/CommentSection";
import {likeVideo, dislikeVideo} from "../services/videoService";

function VideoPage() {
  const { id } = useParams();

  const [video, setVideo] =
    useState(null);

  const [videoData, setVideoData] = useState(video);

  useEffect(() => {
    const fetchVideo =
      async () => {
        try {
          const data =
            await getVideoById(id);

          setVideo(data);
        } catch (error) {
          console.log(error);
        }
      };

    fetchVideo();
  }, [id]);

  if (!video) {
    return <h2>Loading...</h2>;
  }

  let embedUrl = video.videoUrl;

if (video.videoUrl.includes("watch?v=")) {
  embedUrl = video.videoUrl.replace(
    "watch?v=",
    "embed/"
  );
}

  return (
    <div style={{ padding: "20px" }}>
        
      <iframe
        width="800"
        height="450"
        src={embedUrl}
        title={video.title}
      />

      <h2>{video.title}</h2>

      <p>{video.description}</p>

      <p>
        Views: {video.views}
      </p>
        <h4>{video.title}</h4>

<img src={video.thumbnailUrl} width="200" />

<p>{video.views} views</p>

      <div style={{ marginTop: "10px" }}>
  <button
    onClick={async () => {
      const token = localStorage.getItem("token");
      await likeVideo(video._id, token);
      alert("Liked 👍");
    }}
  >
    👍 Like
  </button>

  <button
    onClick={async () => {
      const token = localStorage.getItem("token");
      await dislikeVideo(video._id, token);
      alert("Disliked 👎");
    }}
    style={{ marginLeft: "10px" }}
  >
    👎 Dislike
  </button>
</div>

      {console.log("CommentSection loaded")}
      <CommentSection videoId={video._id} />
    </div>
  );
}

export default VideoPage;