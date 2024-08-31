import React from "react";
import { useForm } from "react-hook-form";
import "./AdminLoginForm.css";
import axios from 'axios'
import { useNavigate, Link } from "react-router-dom";

function AdminLoginForm() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (adminCred) => {
    try {
      const response = await axios.post('https://flash-card-quiz-webapp-backend.onrender.com/admin/login', {
        username: adminCred.username,  // Assuming the API expects 'username' field instead of 'email'
        password: adminCred.password
      });
      console.log(response.data)
      // Check if the response is successful and a token is returned
      if (response.data.statusCode === 200 && response.data.token) {
        // Store the token in session storage
        sessionStorage.setItem('token', response.data.token);
        // Navigate to the admin dashboard or home page
        navigate('/admin');
      } else {
        alert("Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("An error occurred during login. Please try again.");
    }
  };

  return (
    <div>
      <form className="form w-25 mx-auto mt-5" onSubmit={handleSubmit(onSubmit)}>
        <span className="heading">Admin Sign In</span>

        <span className="Mail">Username</span>
        <input
          placeholder="Enter Username"
          type="text"
          className="input"
          {...register("username", { required: "Username is required" })}
        />
        {errors.username && <p>{errors.username.message}</p>}

        <span className="Password">Password</span>
        <input
          placeholder="Enter Password"
          type="password"
          className="input"
          {...register("password", { required: "Password is required" })}
        />
        {errors.password && <p>{errors.password.message}</p>}

        <p className="lead fs-5">Username: admin. Password: admin</p>
        <p className="lead fs-6">This website is still in testing stage. So the paswword and username is hardcoded</p>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default AdminLoginForm;
