import logo from './logo.svg';
import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import SimpleNotification from './Notification';
import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://localhost:4001";
function App() {
  const [response, setResponse] = useState("");

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    socket.on("FromAPI", data => {
      setResponse(data);
      
    });
    //CLEAN UP THE EFFECT COMPONENTWILLUNMOUNT
    return()=>socket.disconnect();
  }, []);

  return (
   <BrowserRouter>
   
   <Routes>
    <Route path='/' element={<SimpleNotification/>}></Route>
   </Routes>

    
      <SimpleNotification value={response}/>
    

   </BrowserRouter>
  );
}

export default App;


// import React, { useState, useEffect } from "react";
// import socketIOClient from "socket.io-client";
// const ENDPOINT = "http://localhost:4001";

// function App() {
//   const [response, setResponse] = useState("");

//   useEffect(() => {
//     const socket = socketIOClient(ENDPOINT);
//     socket.on("FromAPI", data => {
//       setResponse(data);
//     });
//     //CLEAN UP THE EFFECT COMPONENTWILLUNMOUNT
//     return()=>socket.disconnect();
//   }, []);

//   return (
//     <p>
//       It's <time dateTime={response}>{response}</time>
//     </p>
//   );
// }

// export default App;

