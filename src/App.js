import { BrowserRouter, Routes, Route } from "react-router";
import './App.css';
import Home from "./components/Home";
import About from "./components/About";
import Navbar from "./components/Navbar";
import Notestate from "./context/notes/NoteState";
import Alert from "./components/Alert";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { useState } from "react";


function App() {
    const[alert,setalert]=useState(null)

    const showAlert=(message,type)=>{
    setalert({
      msg : message,
      type : type
    })
    setTimeout(()=>{
      setalert(null)
    },1500)
  }

  return (
    <Notestate>
      <BrowserRouter>
        <Navbar/>
        <Alert alert={alert}/>
        <div className="container">

          <Routes>
            <Route path="/" element={<Home showAlert={showAlert} />} />
            <Route path="/about" element={<About showAlert={showAlert}/>} />
            <Route path="/login" element={<Login showAlert={showAlert}/>} />
            <Route path="/signup" element={<Signup showAlert={showAlert} />} />
          </Routes> 

        </div>
     </BrowserRouter>
   </Notestate>
  );
}

export default App;
