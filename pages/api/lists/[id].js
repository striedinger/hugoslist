import nextConnect from 'next-connect';
import database from '../../../lib/middleware/database';

const handler = nextConnect();
const COLLECTION = 'lists';

handler
  .use(database)
  .get(async (req, res) => {
    const { query: { id }, db, ObjectID } = req;
    const list = await db.collection(COLLECTION).findOne({ _id: ObjectID(id) });
    if (list) return res.json(list);
    res.status(404).send('Not Found');
  })
  .post(async (req, res) => {
    const { body: { id, items } = {}, db, ObjectID } = req;
    const updatedList = await db.collection(COLLECTION).updateOne({ _id: ObjectID(id) }, {
      $set: {
        items
      }
    });
    if (updatedList) return res.json({ id, items });
    res.status(404).send('Not Found');
  });

export default handler;