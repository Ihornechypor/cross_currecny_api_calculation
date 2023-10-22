import { styled } from 'styled-components';
import theme from '../../styles/theme';

const Nav = styled.nav`
  padding: 22px ${theme.global.gutter};
  display: flex;
  box-shadow: 0px 2.98256px 7.4564px rgba(0, 0, 0, 0.1);

  img {
    max-width: 50%;
  }
`;
export { Nav };
