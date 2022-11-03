import * as dotenv from 'dotenv';

dotenv.config('../.env');

const config = {
  MODO_BD: {
    memoria: "memoria",
    archivos: "archivos",
    mongodb: "mongodb",
    firebase:"firebase"
  },
  MONGO_DB: {
    uri: `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.hm73cnb.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`
  },
};


export default config;
