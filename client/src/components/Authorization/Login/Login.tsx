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
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    // eslint-disable-next-line no-console
    console.log(data);
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
              type={show ? 'text' : 'password'}
              placeholder={errors.pass ? 'Password is required' : 'Enter password'}
              aria-invalid={errors.pass ? 'true' : 'false'}
              isInvalid={errors.pass ? true : false}
              _placeholder={{ color: errors.pass && 'red.300' }}
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={() => setShow(!show)}>
                {show ? 'Hide' : 'Show'}
              </Button>
            </InputRightElement>
          </InputGroup>
          <Button colorScheme="blue" type="submit">
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
