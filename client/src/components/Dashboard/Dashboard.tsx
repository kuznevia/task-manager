import { InterviewDatabase } from 'components/Dashboard/InterviewDatabase/InterviewDatabase';
import { TasksList } from 'components/Dashboard/TasksList/TasksList';
import { Navigate, useParams } from 'react-router-dom';

export const Dashboard = () => {
  const token = localStorage.getItem('token');
  const { section } = useParams();

  if (!token) {
    return <Navigate replace to="/login" />;
  }

  switch (section) {
    case 'tasks':
      return <TasksList />;
    case 'questions':
      return <InterviewDatabase />;
    default:
      return <Navigate to="/dashboard/questions" replace />;
  }
};
