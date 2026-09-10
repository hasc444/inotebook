import { BrowserRouter, Routes, Route } from "react-router";
import './App.css';
import Home from "./components/Home";
import About from "./components/About";
import Navbar from "./components/Navbar";
import Notestate from "./context/notes/NoteState";
import Alert from "./components/Alert";


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
          </Routes> 

        </div>
     </BrowserRouter>
   </Notestate>
  );
}

export default App;
