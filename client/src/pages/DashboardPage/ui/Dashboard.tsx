import { Navigate, useParams } from 'react-router-dom';
import { Navbar } from 'widgets/DashboardWidgets/Navbar';
import { Questions } from 'widgets/DashboardWidgets/Questions';
import { Tasks } from 'widgets/DashboardWidgets/Tasks';

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
      {section === 'tasks' && <Tasks />}
      {section === 'questions' && <Questions />}
    </>
  );
};
