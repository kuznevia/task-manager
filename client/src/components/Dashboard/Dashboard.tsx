import { TasksList } from 'components/Dashboard/TasksList/TasksList';
import { Navigate } from 'react-router-dom';

export const Dashboard = () => {
  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate replace to="/login" />;
  }

  return <TasksList />;
};
