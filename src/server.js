import apiRouter from './routes/index.js';
import express from 'express';

const app = express();
app.use(express.json());
//manager routes
apiRouter(app)

const PORT = process.env.PORT ||8080;
app.listen(PORT,()=>{
    
    console.log(`http://localhost:${PORT}/`)
})