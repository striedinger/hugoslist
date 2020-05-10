import { useState } from 'react';
import cx from 'classnames';
import ui from '../../lib/styles/ui.module.css';
import styles from './styles.module.css';

const ListInput = props => {
  const { onSubmit } = props;
  const initialItem = { title: '' };
  const [item, setItem] = useState(initialItem);
  const handleChange = (key, value) => {
    setItem({
      ...item,
      [key]: value
    });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(item);
    setItem(initialitem);
  };
  return (
    <form className={cx(styles['list-input'], ui.card)} onSubmit={handleSubmit}>
      <input className={styles.input} type="text" value={item.title} onChange={e => handleChange('title', e.target.value)} required />
      <button className={styles.submit} type="submit">+</button>
    </form>
  );
};

export default ListInput;
