import { Footer, Main } from './components/Layout';
import Section from './components/Section';
import Controller from './components/Controller/index.tsx';
import GlobalStyle from './styles/globalStyles';

function App() {
  return (
    <>
      <GlobalStyle />
      <Main>
        <Section>
          <h1>Get cross curensy PLN</h1>
          <Controller />
        </Section>
      </Main>
      <Footer>Footer</Footer>
    </>
  );
}

export default App;
