import { InterviewDatabase } from 'components/Dashboard/InterviewDatabase/InterviewDatabase';
import { TasksList } from 'components/Dashboard/TasksList/TasksList';
import { Navigate, useParams } from 'react-router-dom';

import { Navbar } from './Navbar';

export const Dashboard = () => {
  const token = localStorage.getItem('token');
  const { section } = useParams();

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (!section) {
    return <Navigate to="/dashboard/tasks" replace />;
  }

  return (
    <>
      <Navbar />
      {section === 'tasks' && <TasksList />}
      {section === 'questions' && <InterviewDatabase />}
    </>
  );
};
