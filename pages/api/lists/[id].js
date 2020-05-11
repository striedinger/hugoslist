import nextConnect from 'next-connect';
import database from '../../../lib/middleware/database';

const handler = nextConnect();
const COLLECTION = 'lists';

handler
  .use(database)
  .get(async (req, res) => {
    const { query: { id }, db, ObjectID } = req;
    const document = await db.collection(COLLECTION).findOne({ _id: ObjectID(id) });
    if (document) return res.json(document);
    res.status(404).send('Not Found');
  })
  .post(async (req, res) => {
    const { body: { id, items } = {}, db, ObjectID } = req;
    const document = await db.collection(COLLECTION).findOneAndUpdate({ _id: ObjectID(id) }, {
      $set: {
        lastUpdated: new Date(),
        items
      }
    },
    { returnOriginal: false });
    if (document && document.value) return res.json(document.value);
    res.status(404).send('Not Found');
  });

export default handler;