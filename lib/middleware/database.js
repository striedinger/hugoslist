import { MongoClient, ObjectID } from 'mongodb';
import nextConnect from 'next-connect';
const MONGO_CONNECTION = process.env.MONGO_CONNECTION;
const MONGO_DB = process.env.MONGO_DB;

const client = new MongoClient(MONGO_CONNECTION, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

async function database(req, _, next) {
  if (!client.isConnected()) await client.connect();
  req.dbClient = client;
  req.db = client.db(MONGO_DB);
  req.ObjectID = ObjectID;
  return next();
}

const middleware = nextConnect();

middleware.use(database);

export default middleware;