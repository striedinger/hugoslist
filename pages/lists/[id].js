import { useState } from 'react';
import { v4 as uuid } from 'uuid';
import Head from 'next/head';
import Error from 'next/error';
import ListInput from 'components/ListInput';
import List from 'components/List';
import client from 'lib/client';
import styles from './styles.module.css';

const ListPage = props => {
  const { list: initialList = {}, errorCode } = props;
  if (errorCode) return <Error statusCode={errorCode} />;
  const [list, setList] = useState(initialList);
  const { title, lastUpdated, items, _id: id} = list;
  const saveLocalList = newItems => {
    setList({
      ...list,
      items: newItems
    });
  };
  const saveList = newItems => {
    client(`/api/lists/${id}`, { body: { id, items: newItems } })
      .then(data => setList(data))
      .catch(error => {
        console.error(error);
        setList({
          ...list,
          items
        });
      });
  };
  const handleSubmit = item => {
    const newItems = [...items, { ...item, id: uuid() }];
    saveLocalList(newItems);
    saveList(newItems);
  };
  const handleUpdate = newItems => {
    saveLocalList(newItems);
    saveList(newItems);
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
        <List items={items} onUpdate={handleUpdate} />
       {formattedLastUpdated && (
         <div className={styles.timestamp}>Last updated {formattedLastUpdated}</div>
       )}
      </div>
    </React.Fragment>
  );
};

export async function getServerSideProps({params, res}) {
  const { id } = params;
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const response = await fetch(`${API_URL}/lists/${id}`);
  res.statusCode = response.status;
  if (response.status !== 200) return { props: { errorCode: response.status }};
  const list = await response.json();
  return { props: { list } };
};

export default ListPage;
