import { Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { RoutePath } from 'shared/config/routeConfig';

import * as S from './Navbar.styled';

export const Navbar = () => {
  const navigate = useNavigate();

  return (
    <S.Navbar>
      <Button
        onClick={() => navigate(RoutePath.dashboard('questions'))}
        colorScheme="blue"
        variant="ghost"
      >
        Questions
      </Button>
      <Button
        onClick={() => navigate(RoutePath.dashboard('tasks'))}
        colorScheme="blue"
        variant="ghost"
      >
        Tasks
      </Button>
      <Button
        onClick={() => {
          localStorage.removeItem('token');
          navigate(RoutePath.login());
        }}
        colorScheme="blue"
        variant="ghost"
      >
        Logout
      </Button>
    </S.Navbar>
  );
};
