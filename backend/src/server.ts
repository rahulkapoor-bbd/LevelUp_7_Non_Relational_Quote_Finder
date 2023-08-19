import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import Quotes from './Quotes';
import { Client, ClientOptions } from '@opensearch-project/opensearch';

dotenv.config();

const app = express();
const port = 3000;

app.use(cors());

const client = new Client({
  node: process.env.NODE_SERVER,
  auth:{
    username:process.env.OS_USERNAME || '',
    password:process.env.PASSWORD || ''
  }
});

async function searchExample(searchInput : string, category: string) {
  try {
    const query: any = {
      index: 'quotes',
      body: {
        query: {}
      }
    };

    if (category === 'Person') {
      query.body.query.match_phrase_prefix = { Person: searchInput };
    } else if (category === 'Occupation') {
      query.body.query.match_phrase_prefix = { Occupation: searchInput };
    } else if (category === 'Date') {
      query.body.query.match_phrase_prefix = { Date: searchInput };
    } else if (category === 'Location') {
      query.body.query.match_phrase_prefix = { Location: searchInput };
    } else if (category === 'Quote') {
      query.body.query.match_phrase_prefix = { Quote: searchInput };
    } else if (category === 'Source') {
      query.body.query.match_phrase_prefix = { Source: searchInput };
    }

    const response = await client.search(query);

    const resultCount : number = response.body.hits.total.value;
    let result : any = {};

    if(resultCount == 1)
    {
      result = response.body.hits.hits[0];

      const quoteObj = new Quotes(result._id,
        result._source.Person,
        result._source.Occupation,
        result._source.Date,
        result._source.Location
        ,result._source.Quote,
        result._source.Source);

      return quoteObj;

    }else{
      
      const quoteObjArray : Quotes[] = [];

      for(let i = 0; i < resultCount; i++)
      {
        result = response.body.hits.hits[i];
        const quoteObj = new Quotes(result._id,
          result._source.Person,
          result._source.Occupation,
          result._source.Date,
          result._source.Location
          ,result._source.Quote,
          result._source.Source);
        
        quoteObjArray.push(quoteObj);
      }

      return quoteObjArray;
    }

  } catch (error) {
    console.error('Error:', error);
  }
}

app.get('/', async (req,res)=>{
  console.log(process.env.NODE_SERVER, process.env.OS_USERNAME, process.env.PASSWORD);
})

app.get('/quote/search/:category/:query', async (req, res) => {
  const category = req.params.category;
  const query = req.params.query;
  const result = await searchExample(query, category);
  console.log(result);
  res.setHeader('Content-Type', 'application/json');
  res.writeHead(200);
  res.end(JSON.stringify(result));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
