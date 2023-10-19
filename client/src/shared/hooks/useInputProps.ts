import { ERROR_BORDER_COLOR } from 'pages/AuthPage/model/authEnums';
import { FieldErrors } from 'react-hook-form';

export const useInputProps = (
  name: string,
  currectPlaceHolder: string,
  errorPlaceHolder: string,
  errors: FieldErrors,
) => {
  return {
    errorBorderColor: ERROR_BORDER_COLOR,
    focusBorderColor: errors[name] && ERROR_BORDER_COLOR,
    placeholder: errors[name] ? errorPlaceHolder : currectPlaceHolder,
    isInvalid: errors[name] ? true : false,
    _placeholder: { color: errors[name] && ERROR_BORDER_COLOR },
  };
};
