import { ReactNode } from 'react';
import * as Styled from './Main.styles';

interface MainProps {
  children: ReactNode;
}

export const Main = ({ children }: MainProps) => <Styled.Main>{children}</Styled.Main>;
