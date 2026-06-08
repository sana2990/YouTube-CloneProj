import axios from "axios";

const API = "http://localhost:5000/api/videos";

// GET ALL VIDEOS
export const getVideos = async () => {
  const res = await axios.get(API);
  return res.data;
};

// GET SINGLE VIDEO (FIX THIS ERROR)
export const getVideoById = async (id) => {
  const res = await axios.get(`${API}/${id}`);
  return res.data;
};

// LIKE VIDEO
export const likeVideo = async (videoId, token) => {
  const res = await axios.put(
    `${API}/${videoId}/like`,
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
    `${API}/${videoId}/dislike`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};