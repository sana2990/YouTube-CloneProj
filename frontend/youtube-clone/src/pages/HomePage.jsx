import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useEffect, useState } from "react";

import VideoCard from "../components/VideoCard";
import FilterBar from "../components/FilterBar";
import { getVideos } from "../services/videoService";


function HomePage() {

  const [videos, setVideos] = useState([]);

  const [search, setSearch] = useState("");

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
         <Navbar search={search} setSearch={setSearch} />
         <FilterBar />

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
         {videos
  .filter((video) =>
    video.title
      .toLowerCase()
      .includes(search.toLowerCase())
  )
  .map((video) => (
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