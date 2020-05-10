import Head from 'next/head';
import styles from './styles.module.css';

const Layout = props => {
  const { children } = props;
  return (
    <div className={styles.layout}>
      <Head>
        <title>Hugo's List</title>
      </Head>
      {children}
    </div>
  );
};

export default Layout;
