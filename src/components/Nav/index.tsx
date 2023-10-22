import * as Styled from './Nav.styles';

interface NavProps {
  srcLogo: string;
}
const Nav = ({ srcLogo }: NavProps) => (
  <Styled.Nav>
    <img src={srcLogo} alt="" />
  </Styled.Nav>
);
export default Nav;
