import {
  Button,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
} from '@chakra-ui/react';
import { Wrapper } from 'components/Authorization/Authorization.styled';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

type FormData = {
  login: string;
  pass: string;
};

export const Login = () => {
  const [showPass, setShowPass] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    const userData = {
      username: data.login,
      password: data.pass,
    };

    try {
      setIsSubmitting(true);
      setShowPass(false);
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });

      setIsSubmitting(false);
      if (response.status === 200) {
        const responseBody = await response.json();
        const { token } = responseBody;
        localStorage.setItem('token', token);
        navigate('/dashboard');
      } else {
        // eslint-disable-next-line no-console
        console.log(await response.json());
        setShowPass(false);
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };

  return (
    <Wrapper>
      <Heading>Authorization</Heading>
      <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        <Stack spacing={3}>
          <Input
            {...register('login', { required: true })}
            errorBorderColor="red.300"
            focusBorderColor={errors.login && 'red.300'}
            placeholder={errors.login ? 'Username is required' : 'Enter username'}
            isInvalid={errors.login ? true : false}
            _placeholder={{ color: errors.pass && 'red.300' }}
          />
          <InputGroup size="md">
            <Input
              {...register('pass', { required: true })}
              errorBorderColor="red.300"
              focusBorderColor={errors.pass && 'red.300'}
              pr="4.5rem"
              type={showPass ? 'text' : 'password'}
              placeholder={errors.pass ? 'Password is required' : 'Enter password'}
              aria-invalid={errors.pass ? 'true' : 'false'}
              isInvalid={errors.pass ? true : false}
              _placeholder={{ color: errors.pass && 'red.300' }}
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={() => setShowPass(!showPass)}>
                {showPass ? 'Hide' : 'Show'}
              </Button>
            </InputRightElement>
          </InputGroup>
          <Button
            colorScheme="blue"
            type="submit"
            isLoading={isSubmitting}
            loadingText="Signing in"
          >
            Sign in
          </Button>
          <Button onClick={() => navigate('/restorePassword')}>Restore password</Button>
          <Button onClick={() => navigate('/register')}>
            Don&apos;t have account? Sign up
          </Button>
        </Stack>
      </form>
    </Wrapper>
  );
};
