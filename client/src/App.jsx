import "./App.css";
import Chat from "./pages/Chat";
import Home from "./pages/Home";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Join from "./pages/Join";

function App() {
  const userName = sessionStorage.getItem("chat_username");
  return (
    <BrowserRouter>
      <div className="h-screen w-screen flex overflow-auto bg-gray-700">
        <Routes>
          <Route path="/join" element={<Join />} />
          <Route
            path="/"
            element={userName ? <Home /> : <Navigate to={"/join"} replace />}
          />
          <Route path="/chat/:socketId" element={<Chat />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
