import axios from "axios";

const API_URL =
  "http://localhost:5000/api/videos";

export const getVideos = async () => {
  const response =
    await axios.get(API_URL);

  return response.data;
};

export const getVideoById = async (id) => {
  const response = await axios.get(
    `${API_URL}/${id}`
  );

  return response.data;
};

export const likeVideo = async (
  id,
  token
) => {
  const response = await axios.put(
    `http://localhost:5000/api/videos/${id}/like`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const dislikeVideo = async (
  id,
  token
) => {
  const response = await axios.put(
    `http://localhost:5000/api/videos/${id}/dislike`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};