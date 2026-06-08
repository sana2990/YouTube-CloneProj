import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { loginUser } from "../services/authService";

function LoginPage() {
  const navigate =
    useNavigate();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const handleSubmit =
    async (e) => {
      e.preventDefault();

      try {
        const data =
          await loginUser({
            email,
            password,
          });

        localStorage.setItem(
          "token",
          data.token
        );

        localStorage.setItem(
          "user",
          JSON.stringify(
            data.user
          )
        );

        navigate("/");
      } catch (error) {
        alert(
          error.response?.data
            ?.message ||
            "Login failed"
        );
      }
    };

  return (
    <div>
      <h2>Login</h2>

      <form
        onSubmit={
          handleSubmit
        }
      >
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(
              e.target.value
            )
          }
        />

        <br />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(
              e.target.value
            )
          }
        />

        <br />

        <button
          type="submit"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default LoginPage;