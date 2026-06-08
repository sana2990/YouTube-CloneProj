import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useEffect, useState } from "react";

import VideoCard from "../components/VideoCard";

import { getVideos } from "../services/videoService";


function HomePage() {

  const [videos, setVideos] =
    useState([]);

  useEffect(() => {
    const fetchVideos =
      async () => {
        try {
          const data =
            await getVideos();

          setVideos(data);
        } catch (error) {
          console.log(error);
        }
      };

    fetchVideos();
  }, []);

  return (
    <>
         <Navbar />

      <div
        style={{
          display: "flex",
        }}
      >
        <Sidebar />

         <div
          style={{
            display: "flex",
            flexWrap: "wrap",
          }}
        >
          {videos.map((video) => (
            <VideoCard
              key={video._id}
              video={video}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default HomePage;