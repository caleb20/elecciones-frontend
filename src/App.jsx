import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Partidos from './components/Partidos';
import NotFound from './components/NotFound'; 
import Felicitaciones from './components/Felicitaciones'; // Importa tu componente 404
// Importa tu componente 404
/* import { AuthProvider } from './contexts/AuthContext'; */

const App = () => {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/partidos" element={<Partidos />} />
        <Route path="/felicitaciones" element={<Felicitaciones />} />
        <Route path="/error" element={<NotFound />} /> {/* Ruta para 404 */}
      </Routes>
    </Router>
  );
};
export default App;

/* export default () => (
  <AuthProvider>
    <App />
  </AuthProvider>
); */