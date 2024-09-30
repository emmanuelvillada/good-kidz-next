import { MongoClient } from 'mongodb';

if (!process.env.MONGODB_URI) {
    throw new Error('Por favor, añade la variable MONGODB_URI a tu archivo .env.local');
}

const uri = process.env.MONGODB_URI;
const options = {};

let client;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === 'development') {
    // En desarrollo, reutilizamos la conexión con MongoDB
    if (!global._mongoClientPromise) {
        client = new MongoClient(uri, options);
        global._mongoClientPromise = client.connect();
    }
    clientPromise = global._mongoClientPromise;
} else {
    // En producción, siempre creamos una nueva conexión
    client = new MongoClient(uri, options);
    clientPromise = client.connect();
}

export default clientPromise;
