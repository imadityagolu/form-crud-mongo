import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AddProduct from './AddProduct.jsx';
import AllProduct from './AllProduct.jsx';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/add-product" replace />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/all-product" element={<AllProduct />} />
      </Routes>
    </Router>
  );
}

export default App;
