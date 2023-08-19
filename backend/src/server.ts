import express from 'express';
import cors from 'cors';
import { searchQuote } from './controllers/quote.controller';


const app = express();
const port = 3000;

app.use(cors());

app.get('/', async (req, res)=>{
  console.log(process.env.NODE_SERVER, process.env.OS_USERNAME, process.env.PASSWORD);
})

// app.get('/quote/search/:query', async (req, res)=>{
//   const query = req.params.query;
//   const result = await searchQuote(query, 'Quote');
//   console.log(result);
//   res.setHeader('Content-Type', 'application/json');
//   res.writeHead(200);
//   res.end(JSON.stringify(result));
// });

app.get('/quote/search/:category/:query', async (req, res) => {
  const category = req.params.category;
  const query = req.params.query;
  const result = await searchQuote(query, category);
  console.log(result);
  res.setHeader('Content-Type', 'application/json');
  res.writeHead(200);
  res.end(JSON.stringify(result));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
