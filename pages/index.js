import NewListInput from '../components/NewListInput';
import styles from './styles.module.css';

const Home = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Hugo's List</h1>
      <NewListInput />
    </div>
  );
};

export default Home;

