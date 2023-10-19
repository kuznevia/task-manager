import {
  Button,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
} from '@chakra-ui/react';
import { AuthHeaders } from 'pages/AuthPage/model/authEnums';
import { Navigate } from 'react-router-dom';
import { RoutePath } from 'shared/config/routeConfig';
import { useInputProps } from 'shared/hooks/useInputProps';
import { useLogin } from 'widgets/AuthWidgets/Login/hooks/useLogin';

export const Login = () => {
  const { showPass, isSubmitting, methods, token, onSubmit, navigate, setShowPass } =
    useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  if (token) {
    return <Navigate replace to="/dashboard" />;
  }

  return (
    <>
      <Heading>{AuthHeaders.LOGIN}</Heading>
      <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        <Stack spacing={3}>
          <Input
            {...register('login', { required: true })}
            {...useInputProps('login', 'Enter username', 'Username is required', errors)}
          />
          <InputGroup size="md">
            <Input
              {...register('pass', { required: true })}
              {...useInputProps('pass', 'Enter password', 'Password is required', errors)}
              pr="4.5rem"
              type={showPass ? 'text' : 'password'}
              aria-invalid={errors.pass ? 'true' : 'false'}
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
          <Button onClick={() => navigate(RoutePath.restorePassword())}>
            Restore password
          </Button>
          <Button onClick={() => navigate(RoutePath.register())}>
            Don&apos;t have account? Sign up
          </Button>
        </Stack>
      </form>
    </>
  );
};
