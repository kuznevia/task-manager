import AuthApi from 'pages/AuthPage/api/authApiSlice';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { RoutePath } from 'shared/config/routeConfig';

type FormData = {
  email: string;
  pass: string;
  confirmPass: string;
};

export const useRegistration = () => {
  const [showPass, setShowPass] = useState(false);
  const [showPassConfirmation, setShowPassConfirmation] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const methods = useForm<FormData>();
  const navigate = useNavigate();

  const onSubmit = async (data: FormData) => {
    const userData = {
      username: data.email,
      password: data.pass,
    };

    try {
      setIsSubmitting(true);
      const response = await AuthApi.register(userData);
      setIsSubmitting(false);
      if (response.status === 200) {
        const { token } = await response.json();
        localStorage.setItem('token', token);
        navigate(RoutePath.dashboard());
      } else {
        // eslint-disable-next-line no-console
        console.log(await response.json());
        setShowPass(true);
        setShowPassConfirmation(true);
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };

  return {
    showPass,
    showPassConfirmation,
    setShowPass,
    setShowPassConfirmation,
    isSubmitting,
    methods,
    onSubmit,
    navigate,
  };
};
