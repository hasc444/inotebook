import { BrowserRouter, Routes, Route } from "react-router";
import './App.css';
import Home from "./components/Home";
import About from "./components/About";
import Navbar from "./components/Navbar";
import Notestate from "./context/notes/NoteState";
import Alert from "./components/Alert";
import Login from "./components/Login";
import Signup from "./components/Signup";


function App() {
  return (
    <Notestate>
      <BrowserRouter>
        <Navbar/>
        <Alert message='note created'/>
        <div className="container">

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes> 

        </div>
     </BrowserRouter>
   </Notestate>
  );
}

export default App;
