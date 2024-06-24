import "./App.css";
import MessTiffins from "./Components/MessTiffins";
import Login from "./Components/Login";
import { Routes, BrowserRouter, Route } from "react-router-dom";
import SignUp from "./Components/SignUp";
import MessOwnerDashboard from "./Components/MessOwnerDashboard";
import Profile from "./Components/Profile";

function App() {
  return (
    <div className="App">
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/tiffin" element={<MessTiffins />} />
        <Route path="/login" element={<Login />} />
        <Route path="/mess" element={<MessOwnerDashboard />} />
        <Route path="/profile" element={<Profile/>}/>
      </Routes>
    </BrowserRouter>
    </div>
  )
}

export default App
