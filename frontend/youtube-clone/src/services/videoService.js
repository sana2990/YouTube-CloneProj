import axios from "axios";

const BASE_URL = "http://localhost:5000/api/videos";

// GET ALL VIDEOS
export const getVideos = async (search = "", category = "") => {
  const res = await axios.get(BASE_URL, {
    params: { search, category },
  });

  return res.data;
};

// GET SINGLE VIDEO
export const getVideoById = async (id) => {
  const res = await axios.get(`${BASE_URL}/${id}`);
  return res.data;
};

// LIKE VIDEO
export const likeVideo = async (videoId, token) => {
  const res = await axios.put(
    `${BASE_URL}/${videoId}/like`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};

// DISLIKE VIDEO
export const dislikeVideo = async (videoId, token) => {
  const res = await axios.put(
    `${BASE_URL}/${videoId}/dislike`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};