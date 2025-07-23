import React from "react";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import ProfilePage from "./Pages/ProfilePage";
import BookDetail from "./assets/components/Dashboard/BookDetail";
import ProtectedRoutes from "./assets/components/Authorization/ProtectedRoutes";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoutes>
              <Dashboard />
            </ProtectedRoutes>
          }
        />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/bookDetail" element={<BookDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
