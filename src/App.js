import logo from './logo.svg';
import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import SimpleNotification from './Notification';
import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";

// For React apps, environment variables must start with REACT_APP_
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:4001";

function App() {
  const [response, setResponse] = useState("");

  useEffect(() => {
    console.log("Connecting to:", BACKEND_URL); 
    
    const socket = socketIOClient(BACKEND_URL, {
      transports: ['websocket', 'polling'],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    socket.on("connect", () => {
      console.log("Socket connected successfully!");
    });

    socket.on("connect_error", (error) => {
      console.error("Connection error:", error);
    });

    socket.on("FromAPI", data => {
      console.log("Received data from API:", data);
      setResponse(data);
    });

    socket.on("disconnect", (reason) => {
      console.log("Socket disconnected:", reason);
    });

    return () => {
      console.log("Cleaning up socket connection");
      socket.disconnect();
    };
  }, []);

  return (
   <BrowserRouter>
     <Routes>
      <Route path='/' element={<SimpleNotification value={response}/>}></Route>
     </Routes>
   </BrowserRouter>
  );
}

export default App;