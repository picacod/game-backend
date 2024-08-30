// App.jsx
import './App.css';

import { Route, Routes, Navigate } from 'react-router-dom';
import AdminRoutes from './Admin/utils/AdminRoutes';
import UserRoutes from './User/utils/UserRoutes';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/admin/*" element={<AdminRoutes />} />
      <Route path="/*" element={<UserRoutes />} />
    </Routes>
  );
}

export default App;
