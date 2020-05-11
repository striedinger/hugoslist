import nextConnect from 'next-connect';
import database from '../../../lib/middleware/database';

const handler = nextConnect();

handler
  .use(database)
  .post(async(req, res) => {
    const { body: data } = req;
    if (!data || !data.title) return res.status(400).send('Bad Request');
    const list = {
      createdAt: new Date(),
      title: data.title,
      items: []
    };
    const document = await req.db.collection('lists').insertOne(list);
    if (document && document.insertedId) return res.json({ id: document.insertedId});
    res.status(500).send('Database Error');
  });

export default handler;
