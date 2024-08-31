import React from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import "./AdminFlashCard.css";
import { useNavigate } from "react-router-dom";  // Import useNavigate

function AdminFlashCard({ id, category, question, answer, onDelete }) {
  const navigate = useNavigate();
  const handleEdit = () => {
    console.log('AdminFlashCard props:', { id, category, question, answer });
    navigate("/admin/edit-cards", {
      state: { id, category, question, answer } // Pass the card data as state
    });
  };

  return (
    <div className="admin-flashcard">
      <div className="admin-flashcard-content">
        <h4 className="admin-flashcard-category">{category}</h4>
        <h5 className="admin-flashcard-question">{question}</h5>
        <p className="admin-flashcard-answer">{answer}</p>
      </div>
      <div className="admin-flashcard-overlay">
        <FaEdit className="icon edit-icon" onClick={handleEdit} />
        <FaTrashAlt className="icon delete-icon" onClick={onDelete} />
      </div>
    </div>
  );
}

export default AdminFlashCard;

