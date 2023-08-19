import express from 'express';
import { searchQuote } from './controllers/quote.controller';


const app = express();
const port = 3000;

app.get('/', async (req,res)=>{
  console.log(process.env.NODE_SERVER, process.env.OS_USERNAME, process.env.PASSWORD);
})

app.get('/quote/search/:query', async (req,res)=>{
  const result = await searchQuote(req.params.query);
  res.setHeader('Content-Type', 'application/json');
  res.writeHead(200);
  res.end(JSON.stringify(result));
})


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
