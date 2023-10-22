import { styled } from 'styled-components';
import theme, { themeColors } from '../../../styles/theme';

const Footer = styled.footer`
  background-color: ${themeColors.dark};
  color: ${themeColors.white};
  padding: 3px ${theme.global.gutter};
  margin-top: 32px;
`;
export { Footer };
