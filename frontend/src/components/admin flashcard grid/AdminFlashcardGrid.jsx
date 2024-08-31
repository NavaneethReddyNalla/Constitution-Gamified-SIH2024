// import React from "react";
// import AdminFlashcard from "../admin flashcard/AdminFlashCard";
// import "./AdminFlashcardGrid.css";

// function AdminFlashcardGrid({ flashcards, onEdit, onDelete }) {
//   return (
//     <div className="admin-flashcard-grid">
//       {flashcards.map((card) => (
//         <AdminFlashcard
//           key={card.id}
//           category={card.category}
//           question={card.question}
//           answer={card.answer}
//           onEdit={() => onEdit(card.id)}
//           onDelete={() => onDelete(card.id)}
//         />
//       ))}
//     </div>
//   );
// }

// export default AdminFlashcardGrid;

import React from "react";
import AdminFlashcard from "../admin flashcard/AdminFlashCard";
import "./AdminFlashcardGrid.css";
import "bootstrap/dist/css/bootstrap.min.css";

function AdminFlashcardGrid({ flashcards, onEdit, onDelete }) {
  return (
    <div className="container my-4">
        <div className="row">
        {flashcards.map((card) => (
          <div key={card.id} className="col mb-3">
            <AdminFlashcard
              id={card.id}
              category={card.category}
              question={card.question}
              answer={card.answer}
              onEdit={() => onEdit(card.id)}
              onDelete={() => onDelete(card.id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminFlashcardGrid;
