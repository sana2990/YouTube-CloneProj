import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getVideoById } from "../services/videoService";

function VideoPage() {
  const { id } = useParams();

  const [video, setVideo] =
    useState(null);

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
    </div>
  );
}

export default VideoPage;