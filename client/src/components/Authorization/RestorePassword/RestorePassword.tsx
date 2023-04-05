import { Button, Heading, Input, Stack, Text } from '@chakra-ui/react';
import { LoginWrapper } from 'components/Authorization/Login/Login.styled';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

type FormData = {
  email: string;
};

export const RestorePassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const navigate = useNavigate();

  const onSubmit = (data: FormData) => {
    // eslint-disable-next-line no-console
    console.log(data);
  };

  return (
    <LoginWrapper>
      <Heading>Restore password</Heading>
      <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        <Stack spacing={3}>
          <Input
            {...register('email', {
              validate: (value) => value.includes('@') && value.includes('.'),
              required: true,
            })}
            errorBorderColor="red.300"
            focusBorderColor={errors.email && 'red.300'}
            placeholder={errors.email ? 'Email is required' : 'Enter email'}
            isInvalid={errors.email ? true : false}
            _placeholder={{ color: errors.email && 'red.300' }}
          />
          {errors.email?.type === 'validate' && (
            <Text fontSize="md" color="red.300">
              Enter valid email
            </Text>
          )}
          <Button colorScheme="blue" type="submit">
            Restore
          </Button>
          <Button onClick={() => navigate('/login')}>Go to login page</Button>
        </Stack>
      </form>
    </LoginWrapper>
  );
};
