import AuthApi from 'pages/AuthPage/api/authApiSlice';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { RoutePath } from 'shared/config/routeConfig';

type FormData = {
  login: string;
  pass: string;
};

export const useLogin = () => {
  const [showPass, setShowPass] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const methods = useForm<FormData>();

  const token = localStorage.getItem('token');

  const onSubmit = async (data: FormData) => {
    const userData = {
      username: data.login,
      password: data.pass,
    };

    try {
      setIsSubmitting(true);
      setShowPass(false);
      const response = await AuthApi.login(userData);
      setIsSubmitting(false);
      if (response.status === 200) {
        const { token } = await response.json();
        localStorage.setItem('token', token);
        navigate(RoutePath.dashboard());
      } else {
        // eslint-disable-next-line no-console
        console.log(await response.json());
        setShowPass(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return { showPass, isSubmitting, methods, token, onSubmit, navigate, setShowPass };
};
