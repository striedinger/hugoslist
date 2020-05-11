import { useState } from 'react';
import Router from 'next/router';
import cx from 'classnames';
import client from 'lib/client';
import ui from 'lib/styles/ui.module.css';
import styles from './styles.module.css';

const NewListInput = () => {
  const initialList = { title: '' };
  const [busy, setBusy] = useState(false);
  const [list, setList] = useState(initialList);
  const handleChange = (key, value) => {
    setList({
      ...list,
      [key]: value
    });
  };
  const handleSubmit = event => {
    event.preventDefault();
    if (!busy) {
      setBusy(true);
      client('/api/lists', { body: list })
        .then(data => {
          Router.push('/lists/[id]', `/lists/${data.id}`);
        })
        .catch(error => {
          console.error(error);
          setList(initialList);
          setBusy(false);
        });
    }
  };
  return (
    <form className={cx(ui.card, styles['container'])} onSubmit={handleSubmit}>
      <label className={styles.label} htmlFor="new-list-title">list title</label>
      <input className={styles.input} id="new-list-title" type="text" value={list.title} onChange={e => handleChange('title', e.target.value)} required disabled={busy} />
      <button className={styles.submit} type="submit" aria-label="Add" disabled={busy}>+</button>
    </form>
  );
};

export default NewListInput;
