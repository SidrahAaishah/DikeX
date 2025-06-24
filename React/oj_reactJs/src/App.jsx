import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { initFlowbite } from 'flowbite';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

function App() {
  const location = useLocation();

  useEffect(() => {
    initFlowbite(); // Reinitialize dropdowns & modals on route change
  }, [location.pathname]);

  return (
    <>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </>
  );
}

export default App;
