import { useEffect, useState } from "react";
import {
  getComments,
  addComment,
} from "../services/commentService";

function CommentSection({ videoId }) {
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");

  // LOAD COMMENTS
  const loadComments = async () => {
    try {
      const data = await getComments(videoId);
      setComments(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadComments();
  }, [videoId]);

  // ADD COMMENT
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      await addComment(videoId, text, token);

      setText("");
      loadComments(); // refresh list
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ marginTop: "20px" }}>
      <h3>Comments</h3>

      {/* ADD COMMENT FORM */}
      <form onSubmit={handleSubmit} style={{ marginBottom: "15px" }}>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write a comment..."
          style={{
            padding: "8px",
            width: "60%",
            marginRight: "10px",
          }}
        />

        <button type="submit">Add Comment</button>
      </form>

      {/* COMMENT LIST */}
      {comments.map((comment) => (
        <div
          key={comment._id}
          style={{
            padding: "10px",
            borderBottom: "1px solid #ddd",
          }}
        >
          {/* USERNAME */}
          <strong>
            {comment.user?.username || "Unknown User"}
          </strong>

          {/* COMMENT TEXT */}
          <p style={{ margin: "5px 0" }}>{comment.text}</p>
        </div>
      ))}
    </div>
  );
}

export default CommentSection;