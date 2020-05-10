import nextConnect from 'next-connect';
import database from '../../../lib/middleware/database';

const handler = nextConnect();

handler
  .use(database)
  .get(async (req, res) => {
    const { query: { id } } = req;
    const list = await req.db.collection('lists').findOne({ id });
    if (list) return res.json(list);
    res.status(404).send('Not Found');
  });

export default handler;