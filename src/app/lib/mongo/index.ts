import { MongoClient } from "mongodb";

const URL = process.env.MONGON_DS as string;
const option = {};

let client = new MongoClient(URL, option);
let clientPromise;

clientPromise = client.connect();

export default client;
