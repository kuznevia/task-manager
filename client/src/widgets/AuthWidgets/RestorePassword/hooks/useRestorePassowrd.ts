import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

type FormData = {
  email: string;
};

export const useRestorePassowrd = () => {
  const methods = useForm<FormData>();
  const navigate = useNavigate();

  const onSubmit = (data: FormData) => {
    // eslint-disable-next-line no-console
    console.log(data);
  };

  return { methods, navigate, onSubmit };
};
