import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { registerUser } from "../services/authService";

function RegisterPage() {
  const navigate =
    useNavigate();

  const [formData, setFormData] =
    useState({
      username: "",
      email: "",
      password: "",
    });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit =
    async (e) => {
      e.preventDefault();

      try {
        await registerUser(
          formData
        );

        alert(
          "Registration successful"
        );

        navigate("/login");
      } catch (error) {
        alert(
          error.response?.data
            ?.message ||
            "Registration failed"
        );
      }
    };

  return (
    <div>
      <h2>Register</h2>

      <form
        onSubmit={
          handleSubmit
        }
      >
        <input
          type="text"
          name="username"
          placeholder="Username"
          onChange={
            handleChange
          }
        />

        <br />

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={
            handleChange
          }
        />

        <br />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={
            handleChange
          }
        />

        <br />

        <button
          type="submit"
        >
          Register
        </button>
      </form>
    </div>
  );
}

export default RegisterPage;