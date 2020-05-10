import Layout from '../components/Layout';
import './styles.css';

const App = props => {
  const { Component, pageProps } = props;
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
};

export default App;