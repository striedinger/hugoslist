import Head from 'next/head';
import styles from './styles.module.css';

const Layout = props => {
  const { children } = props;
  return (
    <div className={styles.container}>
      <Head>
        <title>Hugo's List</title>
      </Head>
      <main>
        {children}
      </main>
    </div>
  );
};

export default Layout;
