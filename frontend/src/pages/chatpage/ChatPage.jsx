// import React, { useState, useEffect, useRef } from "react";
// import "./ChatPage.css";
// import axios from "axios";
// const ChatPage = () => {
//   const [messages, setMessages] = useState([]);
//   const [isLoading,setisLoading] = useState(false)
//   const [input, setInput] = useState("");
//   const [isTyping, setIsTyping] = useState(false);
//   const [mlresponse,setmlresponse] = useState("")
//   const messageEndRef = useRef(null);

//   const exampleQuestions = [
//     "What are the fundamental rights in the Indian Constitution?",
//     "Explain the concept of Directive Principles.",
//     "What is Article 370?"
//   ];

//   const handleSend = async () => {
//     if (input.trim()) {
//       setisLoading(true)
//       setMessages([...messages, { text: input, isUser: true }]);
//       console.log(input)
//       let res = await axios.post('http://192.168.137.20:8000/question',{query:input})
//       setisLoading(false)
//       setInput("");
//       simulateBotResponse()
//     }
//   };

//   const simulateBotResponse = () => {
//     setIsTyping(true);
//     let botResponse = mlresponse;
//     let index = 0;

//     const interval = setInterval(() => {
//       setMessages((prevMessages) => {
//         const lastMessage = prevMessages[prevMessages.length - 1];
//         if (!lastMessage || lastMessage.isUser) {
//           return [...prevMessages, { text: botResponse[index], isUser: false }];
//         } else {
//           const updatedMessages = [...prevMessages];
//           updatedMessages[updatedMessages.length - 1].text += botResponse[index];
//           return updatedMessages;
//         }
//       });

//       index++;
//       if (index >= botResponse.length) {
//         clearInterval(interval);
//         setIsTyping(false);
//       }
//     }, 100); // Adjust this value for streaming speed
//   };

//   useEffect(() => {
//     if (messageEndRef.current) {
//       messageEndRef.current.scrollIntoView({ behavior: "smooth" });
//     }
//   }, [messages, isTyping]);

//   const handleKeyDown = (e) => {
//     if (e.key === "Enter" && !e.shiftKey) {
//       e.preventDefault();
//       handleSend();
//     }
//   };

//   return (
//     <div className="chat-container">
//       <div className="header">
//         <h1>Indian Constitution Chatbot</h1>
//         <h1 className="text-center fs-1">Vidhur</h1>
//         <p>Ask your questions about the Indian Constitution.</p>
//         {messages.length === 0 && (
//           <div className="example-questions">
//             <p>Examples:</p>
//             <ul>
//               {exampleQuestions.map((question, index) => (
//                 <li key={index}>{question}</li>
//               ))}
//             </ul>
//           </div>
//         )}
//       </div>
//       <div className="messages">
//         {messages.map((message, index) => (
//           <div
//             key={index}
//             className={`message ${message.isUser ? "user" : "bot"}`}
//           >
//             {message.text.split("\n").map((line, i) => (
//               <span key={i}>
//                 {line}
//                 <br />
//               </span>
//             ))}
//           </div>
//         ))}
//         <div ref={messageEndRef} />
//       </div>
//       <div className="input-container">
//         <textarea
//           placeholder="Type your question..."
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           onKeyDown={handleKeyDown}
//           rows="2"
//         />
//         <button onClick={handleSend}>Send</button>
//       </div>
//     </div>
//   );
// };

// export default ChatPage;



import React, { useState, useEffect, useRef } from "react";
import "./ChatPage.css";
import axios from "axios";

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [input, setInput] = useState("");
  const messageEndRef = useRef(null);

  const exampleQuestions = [
    "What are the fundamental rights in the Indian Constitution?",
    "Explain the concept of Directive Principles.",
    "What is Article 370?"
  ];

  const handleSend = async () => {
    if (input.trim()) {
      setMessages([...messages, { text: input, isUser: true }]);
      setInput("");
      setIsLoading(true);

      try {
        let res = await axios.post('http://192.168.137.20:8000/question', { query: input });
        console.log(res.data.response)
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: res.data.response, isUser: false }
        ]);
      } catch (error) {
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: "An error occurred while fetching the response.", isUser: false }
        ]);
      } finally {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isLoading]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="chat-container">
      <div className="header">
        <h1>Indian Constitution Chatbot</h1>
        <h1 className="text-center fs-1">Vidhur</h1>
        <p>Ask your questions about the Indian Constitution.</p>
        {messages.length === 0 && (
          <div className="example-questions">
            <p>Examples:</p>
            <ul>
              {exampleQuestions.map((question, index) => (
                <li key={index}>{question}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <div className="messages">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`message ${message.isUser ? "user" : "bot"}`}
          >
            {message.text.split("\n").map((line, i) => (
              <span key={i}>
                {line}
                <br />
              </span>
            ))}
          </div>
        ))}
        {isLoading && (
          <div className="message bot">
            <div className="skeleton-loader"></div>
            <div className="skeleton-loader"></div>
            <div className="skeleton-loader"></div>
          </div>
        )}
        <div ref={messageEndRef} />
      </div>
      <div className="input-container">
        <textarea
          placeholder="Type your question..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          rows="2"
        />
        <button onClick={handleSend} disabled={isLoading}>
          {isLoading ? "Sending..." : "Send"}
        </button>
      </div>
    </div>
  );
};

export default ChatPage;

