import React, { useState,useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import "./CategoryNavs.css";

function CategoryNavs() {

  const [categories, setCategories] = useState([]); // Initialize as an empty array

  async function getCategories() {
    try {
      const response = await axios.get("https://flash-card-quiz-webapp-backend.onrender.com/all-categories");
      setCategories(response.data); // Set categories data
      console.log(categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  }

  useEffect(() => {
    getCategories();
  }, []);

  const location = useLocation();
  const [activeCategory, setActiveCategory] = useState(location.pathname);

  return (
    <div className="category-selector-bar p-3">
      <ul className="nav nav-pills">
        {categories.map((category) => (
          <li className="nav-item" key={category.id}>
            <Link
              to={category.path}
              className={`nav-link ${activeCategory === category.path ? "active" : ""}`}
              onClick={() => setActiveCategory(category.path)}
            >
              {category.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CategoryNavs;
