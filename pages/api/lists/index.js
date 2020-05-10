import { v4 as uuid } from 'uuid';
import nextConnect from 'next-connect';
import database from '../../../lib/middleware/database';

const handler = nextConnect();

handler
  .use(database)
  .post(async(req, res) => {
    const { body: data } = req;
    if (!data || !data.title) return res.status(400).send('Bad Request');
    const list = {
      id: uuid(),
      title: data.title,
      items: []
    };
    const insertedList = await req.db.collection('lists').insertOne(list);
    if (insertedList) return res.json({ id: list.id });
    res.status(500).send('Database Error');
  });

export default handler;
