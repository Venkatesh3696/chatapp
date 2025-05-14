import "./App.css";
import Chat from "./pages/Chat";
import Home from "./pages/Home";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Join from "./pages/Join";
import { useEffect } from "react";
import { useState } from "react";

function App() {
  const [userName, setUserName] = useState(() =>
    sessionStorage.getItem("chat_username")
  );
  console.log(userName);

  useEffect(() => {
    const checkUserName = () =>
      setUserName(sessionStorage.getItem("chat_username"));
    window.addEventListener("storage", checkUserName);
    return () => window.removeEventListener("storage", checkUserName);
  }, []);

  return (
    <BrowserRouter>
      <div className="h-screen w-screen flex overflow-auto bg-gray-700">
        <Routes>
          <Route path="/join" element={<Join onJoin={setUserName} />} />{" "}
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
