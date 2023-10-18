import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { routeConfig, RoutePath } from 'shared/config/routeConfig';

export const AppRouter = () => {
  const location = useLocation();
  const token = localStorage.getItem('token');
  if (
    !token &&
    ![RoutePath.login(), RoutePath.register(), RoutePath.restorePassword()].includes(
      location.pathname,
    )
  ) {
    return <Navigate replace to="/login" />;
  }

  return (
    <Routes>
      {routeConfig.map(({ path, element }) => (
        <Route key={path} path={path} element={element} />
      ))}
    </Routes>
  );
};
