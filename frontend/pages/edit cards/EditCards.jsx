import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import "./EditCards.css";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

function EditCard() {
  let token = sessionStorage.getItem("token");
  const axiosWithToken = axios.create({
    headers: { authorization: `Bearer ${token}` },
  });

  const location = useLocation();
  const navigate = useNavigate();
  const { id, category, question, answer } = location.state || {}; // Destructure card data from state
//   console.log("In EditCards Page:",{ id, category, question, answer })
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      category: category || "",
      question: question || "",
      answer: answer || "",
    },
  });

  const [isOtherCategory, setIsOtherCategory] = useState(false);
  const [categories, setCategories] = useState([]);
  const selectedCategory = watch("category");

  async function getCategories() {
    try {
      const response = await axiosWithToken.get("https://flash-card-quiz-webapp-backend.onrender.com/admin/categories");
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  }

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    setIsOtherCategory(selectedCategory === "other");
  }, [selectedCategory]);

  const onSubmit = async (data) => {
    try {
      //https://flash-card-quiz-webapp-backend.onrender.com/admin/edit-flashcard/6
      console.log('in editCards. ID:',id)
      const res = await axiosWithToken.put(`https://flash-card-quiz-webapp-backend.onrender.com/admin/edit-flashcard/${id}`, {
        ...data,
      });
      if (res.data.message === "Flashcard updated successfully") {
        alert("Card Updated Successfully");
        navigate("/admin"); // Redirect after successful update
      }
    } catch (error) {
      console.error("Error editing flashcard:", error);
    }
  };

  return (
    <div className="addcard-form-container">
      <h2 className="fs-1">Edit Flashcard</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="addcard-form-group">
          <label htmlFor="question">Question</label>
          <input
            id="question"
            type="text"
            {...register("question", { required: "Question is required" })}
          />
          {errors.question && <p className="error-message">{errors.question.message}</p>}
        </div>

        <div className="addcard-form-group">
          <label htmlFor="answer">Answer</label>
          <textarea id="answer" {...register("answer", { required: "Answer is required" })} />
          {errors.answer && <p className="error-message">{errors.answer.message}</p>}
        </div>

        <div className="addcard-form-group">
          <label htmlFor="category">Category</label>
          <select id="category" {...register("category", { required: "Category is required" })}>
            <option value="" disabled>
              Select a category
            </option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.name}>
                {cat.name}
              </option>
            ))}
            <option value="other">Other</option>
          </select>
          {errors.category && <p className="error-message">{errors.category.message}</p>}
        </div>

        {isOtherCategory && (
          <div className="addcard-form-group">
            <label
              htmlFor="newCategory"
              className="form-label"
              style={{ color: "#d2691e", fontWeight: "bold" }}
            >
              New Category
            </label>
            <input
              id="newCategory"
              type="text"
              {...register("newCategory", {
                required: "New Category is required",
              })}
            />
            {errors.newCategory && <p className="error-message">{errors.newCategory.message}</p>}
          </div>
        )}

        <button type="submit" className="submit-button">
          Save Flashcard
        </button>
      </form>
    </div>
  );
}

export default EditCard;
