import React, { useEffect, useState } from "react";
import AdminFlashcardGrid from "../../components/admin flashcard grid/AdminFlashcardGrid";
import "./AdminEditOrDeleteCards.css";
import axios from "axios";
import Loader from "../../components/loader/Loader";
import { useNavigate } from "react-router-dom";
function AdminEditOrDeleteCards() {
  let token = sessionStorage.getItem("token");
  const axiosWithToken = axios.create({
    headers: { authorization: `Bearer ${token}` },
  });

  const navigate = useNavigate();

  const [flashcards, setFlashcards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  async function getFlashCards(params) {
    setIsLoading(true);
    let res = await axiosWithToken.get("https://flash-card-quiz-webapp-backend.onrender.com/admin/flashcards");
    console.log(res.data);
    setFlashcards(res.data.payload);
    setIsLoading(false);
    console.log(isLoading);
  }

  const handleEdit = async (id) => {
    console.log("Edit flashcard with ID:", id);
    let res = await axiosWithToken.delete(`https://flash-card-quiz-webapp-backend.onrender.com/admin/edit-flashcard/${id}`);
    console.log("In handleEdit function: ", res.data);
    if (res.data.message === "Flashcard updated successfully") {
      alert("Flashcard updated successfully!");
      navigate('/admin')
    } else {
      alert("Flashcard not found");
    }

    // Implement edit functionality
  };

  function deleteObjectById(array, id) {
    return array.filter((item) => item.id !== id);
  }

  const handleDelete = async (id) => {
    // Implement delete functionality
    let res = await axiosWithToken.delete(`https://flash-card-quiz-webapp-backend.onrender.com/admin/delete-flashcard/${id}`);
    if (res.data.message === "Flashcard deleted successfully") {
      alert("Card deleted succesfully!");
      setFlashcards(deleteObjectById(flashcards, id));
    }
  };

  useEffect(() => {
    getFlashCards();
  }, []);
  return (
    <div className="admin-page-add-delete-cards">
      {isLoading === true ? (
        <div className="page-loader">
          <Loader />
        </div>
      ) : (
        <AdminFlashcardGrid flashcards={flashcards} onEdit={handleEdit} onDelete={handleDelete} />
      )}
    </div>
  );
}

export default AdminEditOrDeleteCards;
