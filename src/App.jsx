import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Votacion from "./components/Votacion";
import Felicitaciones from "./components/Felicitaciones";
import ErrorPage from "./components/ErrorPage";
import Login from "./components/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import Mantenimiento from "./components/Mantenimiento";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/error" element={<ErrorPage />} />
        
        <Route
          path="/felicitaciones"
          element={
            <ProtectedRoute>
              <Felicitaciones />
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/votacion"
          element={
            <ProtectedRoute requiredRoles={['ROLE_ALUMNO']}>
              <Votacion />
            </ProtectedRoute>
          }
        />

           <Route
          path="/mantenimiento"
          element={
            <ProtectedRoute requiredRoles={['ROLE_MAESTRO']}>
              <Mantenimiento />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/error" />} />
      </Routes>
    </Router>
  );
};

export default App;
