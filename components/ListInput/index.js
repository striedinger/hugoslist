import { useState } from 'react';
import cx from 'classnames';
import ui from 'lib/styles/ui.module.css';
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
  const handleSubmit = event => {
    event.preventDefault();
    onSubmit(item);
    setItem(initialItem);
  };
  return (
    <form className={cx(styles['container'], ui.card)} onSubmit={handleSubmit}>
      <label className={styles.label} htmlFor="new-item-title">item title</label>
      <input className={styles.input} id="new-item-title" type="text" value={item.title} onChange={e => handleChange('title', e.target.value)} required />
      <button className={styles.submit} type="submit" aria-label="Add">+</button>
    </form>
  );
};

export default ListInput;
