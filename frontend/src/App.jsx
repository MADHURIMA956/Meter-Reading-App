import { Navigate, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import NotFound from './pages/404';
import { useState } from 'react';
import RefrshHandler from './RefreshHandler';

function App() {

  const [isAuthenticated, setIsAuthenticated] =useState(false);

  const PrivateRoute = ({element}) => {
    return isAuthenticated ? element : <Navigate to='/login'/>
  }
  return (
    <div className="App">
      <RefrshHandler setIsAuthenticated={setIsAuthenticated} />
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<PrivateRoute element={<Home />} />} />
        {/* 404 page catch-all */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;

