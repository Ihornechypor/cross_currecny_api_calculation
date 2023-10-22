import { ReactNode } from 'react';
import * as Styled from './Footer.styles';

interface FooterProps {
  children: ReactNode;
}

export const Footer = ({ children }: FooterProps) => <Styled.Footer>{children}</Styled.Footer>;
