import { Button } from '@chakra-ui/react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import { NavbarWrapper } from './Dashboard.styled';

export const Navbar = () => {
  const navigate = useNavigate();

  return (
    <NavbarWrapper>
      <Button
        onClick={() => navigate('/dashboard/questions')}
        colorScheme="blue"
        variant="ghost"
      >
        Questions
      </Button>
      <Button
        onClick={() => navigate('/dashboard/tasks')}
        colorScheme="blue"
        variant="ghost"
      >
        Tasks
      </Button>
      <Button
        onClick={() => {
          localStorage.removeItem('token');
          navigate('/login');
        }}
        colorScheme="blue"
        variant="ghost"
      >
        Logout
      </Button>
    </NavbarWrapper>
  );
};
