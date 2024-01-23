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
          <h1>Paste csv code inside textarea</h1>
          <br />
          <h2>How to use</h2>
          <ul>
            <li>
              download csv from (
              <a href="https://www.upwork.com/nx/payments/reports/transaction-history/">
                https://www.upwork.com/nx/payments/reports/transaction-history/
              </a>
              )
            </li>
            <li>choose if you paying fee(vat) or not</li>
            <li>open csv in editor or notepad</li>
            <li>paste csv to input textarea</li>
            <li>click load csv</li>
          </ul>
          <br />
          <Controller />
        </Section>
      </Main>
      <Footer>Tool to calculate unregistred entrepreneurship for Poland for Upwork users</Footer>
    </>
  );
}

export default App;
