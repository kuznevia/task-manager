import { AuthPage } from 'pages/AuthPage';
import { Dashboard } from 'pages/DashboardPage';
import { Navigate } from 'react-router-dom';
import { Login } from 'widgets/AuthWidgets/Login';
import { Registration } from 'widgets/AuthWidgets/Registration';
import { RestorePassword } from 'widgets/AuthWidgets/RestorePassword';

export enum AppRotes {
  MAIN = 'main',
  LOGIN = 'login',
  REGISTER = 'register',
  RESTORE_PASSWORD = 'restorePassword',
  DASHBOARD = 'dashboard',
}

export const RoutePath: Record<AppRotes, (param?: string) => string> = {
  [AppRotes.MAIN]: () => '/',
  [AppRotes.LOGIN]: () => '/login',
  [AppRotes.REGISTER]: () => '/register',
  [AppRotes.RESTORE_PASSWORD]: () => '/restorePassword',
  [AppRotes.DASHBOARD]: (section?: string) =>
    section ? `/dashboard/${section}` : '/dashboard',
};

export const routeConfig = [
  {
    path: RoutePath.main(),
    element: <Navigate replace to={RoutePath.dashboard()} />,
  },
  {
    path: RoutePath.login(),
    element: <AuthPage component={Login} />,
  },
  {
    path: RoutePath.register(),
    element: <AuthPage component={Registration} />,
  },
  {
    path: RoutePath.restorePassword(),
    element: <AuthPage component={RestorePassword} />,
  },
  {
    path: RoutePath.dashboard(':section?'),
    element: <Dashboard />,
  },
];
