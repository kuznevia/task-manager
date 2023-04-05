import {
  Button,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Text,
} from '@chakra-ui/react';
import { LoginWrapper } from 'components/Authorization/Login/Login.styled';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

type FormData = {
  email: string;
  pass: string;
  confirmPass: string;
};

export const Registration = () => {
  const [showPass, setShowPass] = useState(false);
  const [showPassConfirmation, setShowPassConfirmation] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormData>();
  const navigate = useNavigate();

  const onSubmit = async (data: FormData) => {
    const userData = {
      username: data.email,
      password: data.pass,
    };

    try {
      setIsSubmitting(true);
      const response = await fetch('http://localhost:5000/api/users/registration', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });
      setIsSubmitting(false);
      if (response.status === 200) {
        reset();
      } else {
        // eslint-disable-next-line no-console
        console.log(await response.json());
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };

  const pass = watch('pass');

  return (
    <LoginWrapper>
      <Heading>Sing up</Heading>
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
          <InputGroup size="md">
            <Input
              {...register('confirmPass', {
                validate: (value) => {
                  if (value !== pass) {
                    return 'Your passwords do no match';
                  }
                },
                required: true,
              })}
              errorBorderColor="red.300"
              focusBorderColor={errors.confirmPass && 'red.300'}
              pr="4.5rem"
              type={showPassConfirmation ? 'text' : 'password'}
              placeholder={
                errors.confirmPass ? 'Password is required' : 'Confirm password'
              }
              aria-invalid={errors.confirmPass ? 'true' : 'false'}
              isInvalid={errors.confirmPass ? true : false}
              _placeholder={{ color: errors.confirmPass && 'red.300' }}
            />
            <InputRightElement width="4.5rem">
              <Button
                h="1.75rem"
                size="sm"
                onClick={() => setShowPassConfirmation(!showPassConfirmation)}
              >
                {showPassConfirmation ? 'Hide' : 'Show'}
              </Button>
            </InputRightElement>
          </InputGroup>
          {errors.confirmPass?.type === 'validate' && (
            <Text fontSize="md" color="red.300">
              {errors.confirmPass?.message}
            </Text>
          )}
          <Button
            colorScheme="blue"
            type="submit"
            isLoading={isSubmitting}
            loadingText="Submitting"
          >
            Register
          </Button>
          <Button onClick={() => navigate('/login')}>Go to login page</Button>
        </Stack>
      </form>
    </LoginWrapper>
  );
};
