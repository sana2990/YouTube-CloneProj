import axios from "axios";

const API_URL =
  "http://localhost:5000/api/comments";

export const getComments =
  async (videoId) => {
    const response =
      await axios.get(
        `${API_URL}/${videoId}`
      );

    return response.data;
  };

export const addComment = async (
  videoId,
  text,
  token
) => {
  const response = await axios.post(
    `http://localhost:5000/api/comments/${videoId}`,
    { text },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};