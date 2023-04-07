import { Navigate } from 'react-router-dom';

function App() {
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate replace to="/login" />;
  }
  return <Navigate replace to="/dashboard" />;
}

export default App;
