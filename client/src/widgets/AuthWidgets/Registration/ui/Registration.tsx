import {
  Button,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Text,
} from '@chakra-ui/react';
import { AuthHeaders } from 'pages/AuthPage/model/authEnums';
import { useInputProps } from 'shared/hooks/useInputProps';
import { useRegistration } from 'widgets/AuthWidgets/Registration/hooks/useRegistration';

export const Registration = () => {
  const {
    showPass,
    showPassConfirmation,
    setShowPass,
    setShowPassConfirmation,
    isSubmitting,
    methods,
    onSubmit,
    navigate,
  } = useRegistration();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = methods;

  const pass = watch('pass');

  return (
    <>
      <Heading>{AuthHeaders.REGISTRATION}</Heading>
      <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        <Stack spacing={3}>
          <Input
            {...register('email', {
              validate: (value) => value.includes('@') && value.includes('.'),
              required: true,
            })}
            {...useInputProps('email', 'Enter email', 'Email is required', errors)}
          />
          {errors.email?.type === 'validate' && (
            <Text fontSize="md" color="red.300">
              Enter valid email
            </Text>
          )}
          <InputGroup size="md">
            <Input
              {...register('pass', {
                validate: (value) => value.length > 3 && value.length < 11,
                required: true,
              })}
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
          {errors.pass?.type === 'validate' && (
            <Text fontSize="md" color="red.300">
              Password should be from 4 to 10 characters
            </Text>
          )}
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
              {...useInputProps(
                'confirmPass',
                'Confirm password',
                'Password is required',
                errors,
              )}
              pr="4.5rem"
              type={showPassConfirmation ? 'text' : 'password'}
              aria-invalid={errors.confirmPass ? 'true' : 'false'}
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
    </>
  );
};
