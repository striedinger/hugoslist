import fetch from 'isomorphic-unfetch';
import { useState } from 'react';
import { v4 as uuid } from 'uuid';
import Head from 'next/head';
import Error from 'next/error';
import ListInput from '../../components/ListInput';
import List from '../../components/List';
import styles from './styles.module.css';

const API_URL = process.env.API_URL;

const ListPage = props => {
  const { list: { title, items: initialItems = [] } = {}, errorCode } = props;
  if (errorCode) return <Error statusCode={errorCode} />;
  const [items, setItems] = useState(initialItems);
  const handleSubmit = (item) => {
    setItems([
      ...items,
      {
        ...item,
        id: uuid()
      }
    ]);
  };
  const handleUpdate = (items) => {
    setItems(items);
  };
  return (
    <React.Fragment>
      <Head>
        <title>{title} - Hugo's List</title>
      </Head>
      <div className={styles['container']}>
        <h1 className={styles.title}>{title}</h1>
        <ListInput onSubmit={handleSubmit}/>
        <List items={items} onUpdate={handleUpdate} />
      </div>
    </React.Fragment>
  );
};

export async function getServerSideProps({params, res}) {
  const { id } = params;
  const response = await fetch(`${API_URL}/lists/${id}`);
  res.statusCode = response.status;
  if (response.status !== 200) return { props: { errorCode: response.status }};
  const list = await response.json();
  return { props: { list } };
};

export default ListPage;
