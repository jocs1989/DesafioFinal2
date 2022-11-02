import express from 'express';
import managerRouter from './routes/index.js';
const app = express();
app.use(express.json());
//manager routes
managerRouter(app)

const PORT = process.env.PORT ||8080;
app.listen(PORT,()=>{
    console.log(`http://localhost:${PORT}/`)
})