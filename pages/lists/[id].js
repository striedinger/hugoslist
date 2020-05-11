import fetch from 'isomorphic-unfetch';
import { useEffect, useRef, useState } from 'react';
import { v4 as uuid } from 'uuid';
import Head from 'next/head';
import Error from 'next/error';
import ListInput from '../../components/ListInput';
import List from '../../components/List';
import styles from './styles.module.css';
import client from '../../lib/client';

const ListPage = props => {
  const { list: { _id: id, title, items: initialItems = [], lastUpdated } = {}, errorCode } = props;
  if (errorCode) return <Error statusCode={errorCode} />;
  const firstRun = useRef(true);
  const [items, setItems] = useState(initialItems);
  useEffect(() => {
    // This is to avoid fetching data on first mount, since we are providing through SSR
    if (firstRun.current) {
      firstRun.current = false;
      return;
    }
    client(`/api/lists/${id}`, { body: { id, items } })
      .then(data => console.log(data))
      .catch(error => console.error(error));
  }, [items]);
  const handleSubmit = (item) => {
    setItems([
      ...items,
      {
        ...item,
        id: uuid()
      }
    ]);
  };
  const formattedLastUpdated = lastUpdated && new Date(lastUpdated).toLocaleDateString('end-US', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: true
  });
  return (
    <React.Fragment>
      <Head>
        <title>{title} - Hugo's List</title>
      </Head>
      <div className={styles['container']}>
        <h1 className={styles.title}>{title}</h1>
        <ListInput onSubmit={handleSubmit}/>
        <List items={items} onUpdate={setItems} />
       {formattedLastUpdated && (
         <div className={styles.timestamp}>Last updated {formattedLastUpdated}</div>
       )}
      </div>
    </React.Fragment>
  );
};

export async function getServerSideProps({params, res}) {
  const { id } = params;
  const API_URL = process.env.API_URL;
  const response = await fetch(`${API_URL}/lists/${id}`);
  res.statusCode = response.status;
  if (response.status !== 200) return { props: { errorCode: response.status }};
  const list = await response.json();
  return { props: { list } };
};

export default ListPage;
