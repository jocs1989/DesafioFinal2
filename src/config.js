import * as dotenv from 'dotenv';

dotenv.config('../.env');

const config = {
  MODO_BD: {
    memoria: "memoria",
    archivos: "archivos",
    mongodb: "mongodb"
  },
  MONGO_DB: {
    uri: process.env.MONGO_DB_URI
  },
};


export default config;
