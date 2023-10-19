import { FunctionComponent } from 'react';

import * as S from './AuthPage.styled';

export const AuthPage = ({ component: Component }: { component: FunctionComponent }) => {
  return (
    <S.AuthPage>
      <Component />
    </S.AuthPage>
  );
};
