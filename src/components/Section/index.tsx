import * as Styled from './Section.styles';
import { ReactNode } from 'react';

interface SectionProps {
  children: ReactNode;
}
const Section = ({ children }: SectionProps) => <Styled.Section>{children}</Styled.Section>;
export default Section;
