import nextConnect from 'next-connect';
import database from '../../../lib/middleware/database';

const handler = nextConnect();

handler
  .use(database)
  .post(async(req, res) => {
    const { body: data } = req;
    if (!data || !data.title) return res.status(400).send('Bad Request');
    const list = {
      title: data.title,
      items: []
    };
    const insertedList = await req.db.collection('lists').insertOne(list);
    if (insertedList && insertedList.insertedId) return res.json({ id: insertedList.insertedId});
    res.status(500).send('Database Error');
  });

export default handler;
