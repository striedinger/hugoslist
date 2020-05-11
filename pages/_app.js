import Layout from 'components/Layout';
import './styles.css';

export function reportWebVitals(metric) {
  console.log(metric);
};

const App = props => {
  const { Component, pageProps } = props;
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
};

export default App;