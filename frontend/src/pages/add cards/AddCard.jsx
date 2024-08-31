import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import "./AddCard.css"; // Import the custom CSS for styling
import axios from "axios";

function AddCard() {
  let token = sessionStorage.getItem("token");
  const axiosWithToken = axios.create({
    headers: { authorization: `Bearer ${token}` },
  });
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      category: "", // Set default value to an empty string
    },
  });
  const [isOtherCategory, setIsOtherCategory] = useState(false);
  const [categories, setCategories] = useState([]); // Initialize as an empty array
  const selectedCategory = watch("category");

  async function getCategories() {
    try {
      const response = await axiosWithToken.get("https://flash-card-quiz-webapp-backend.onrender.com/admin/categories");
      setCategories(response.data); // Set categories data
      console.log(categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  }

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    if (selectedCategory === "other") {
      setIsOtherCategory(true);
    } else {
      setIsOtherCategory(false);
    }
  }, [selectedCategory]);

  async function onSubmit(cardData) {
    try {
      // Check if the category is "other" and replace it with newCategory value
      if (cardData.category === "other" && cardData.newCategory) {
        cardData.category = cardData.newCategory;
        delete cardData.newCategory; // Remove the newCategory field
      }
  
      console.log("in addCard.jsx", cardData);
  
      // Make the API request with the updated cardData
      const res = await axiosWithToken.post("https://flash-card-quiz-webapp-backend.onrender.com/admin/add-flashcard", cardData);
      console.log(res.data);
  
      if (res.data.status === "success") {
        alert("Card Inserted Successfully");
      }
    } catch (error) {
      console.error("Error submitting flashcard:", error);
    }
  }
  

  const handleFormSubmit = (data) => {
    // if (isOtherCategory) {
    //   onCreateCategory(data.newCategory); // Create new category
    // }
    onSubmit(data); // Submit the flashcard data
    reset(); // Reset the form
  };

  return (
    <div className="addcard-form-container">
      <h2 className="fs-1">Add New Flashcard</h2>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        {/* Question Input */}
        <div className="addcard-form-group">
          <label htmlFor="question">Question</label>
          <input
            id="question"
            type="text"
            {...register("question", { required: "Question is required" })}
          />
          {errors.question && <p className="error-message">{errors.question.message}</p>}
        </div>

        {/* Answer Input */}
        <div className="addcard-form-group">
          <label htmlFor="answer">Answer</label>
          <textarea id="answer" {...register("answer", { required: "Answer is required" })} />
          {errors.answer && <p className="error-message">{errors.answer.message}</p>}
        </div>

        {/* Category Dropdown */}
        <div className="addcard-form-group">
          <label htmlFor="category">Category</label>
          <select id="category" {...register("category", { required: "Category is required" })}>
            <option value="" disabled>
              Select a category
            </option>{" "}
            {/* Non-selectable placeholder */}
            {categories.length > 0 ? (
              categories.map((category) => (
                <option key={category.id} value={category.name}>
                  {category.name}
                </option>
              ))
            ) : (
              <option value="">Loading categories...</option>
            )}
            <option value="other">Other</option>
          </select>
          {errors.category && <p className="error-message">{errors.category.message}</p>}
        </div>

        {/* New Category Input */}
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
                required: isOtherCategory ? "New Category is required" : false,
              })}
            />
            {errors.newCategory && <p className="error-message">{errors.newCategory.message}</p>}
          </div>
        )}

        {/* Submit Button */}
        <button type="submit" className="submit-button">
          Add Flashcard
        </button>
      </form>
    </div>
  );
}

export default AddCard;
