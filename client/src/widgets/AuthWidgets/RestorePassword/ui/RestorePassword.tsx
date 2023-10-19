import { Button, Heading, Input, Stack, Text } from '@chakra-ui/react';
import { AuthHeaders } from 'pages/AuthPage/model/authEnums';
import { RoutePath } from 'shared/config/routeConfig';
import { useInputProps } from 'shared/hooks/useInputProps';
import { useRestorePassowrd } from 'widgets/AuthWidgets/RestorePassword/hooks/useRestorePassowrd';

export const RestorePassword = () => {
  const { methods, navigate, onSubmit } = useRestorePassowrd();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  return (
    <>
      <Heading>{AuthHeaders.RESTORE_PASSWORD}</Heading>
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
          <Button colorScheme="blue" type="submit">
            Restore
          </Button>
          <Button onClick={() => navigate(RoutePath.login())}>Go to login page</Button>
        </Stack>
      </form>
    </>
  );
};
