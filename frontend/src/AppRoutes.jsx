import App from "./App";
import Login from "./componets/Login";
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

function AppRoute() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        
        <Route path="/events" element={
            <App />
        } />

        {/* Rotta per il singolo evento con ID dinamico */}
        <Route path="/events/:id" element={
            <Event />
        } />

        <Route path="/" element={<Navigate to="/events" />} />
      </Routes>
    </BrowserRouter>
  );
}
export default AppRoute;