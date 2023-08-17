import express from 'express';
import Quotes from './Quotes';
import { Client, ClientOptions } from '@opensearch-project/opensearch';

const app = express();
const port = 3000;

const client = new Client({
  node:'',
  auth:{
    username:'',
    password:''
  }
});

async function searchExample(searchInput : string) {
  try {
    const response = await client.search({
      index: 'quotes',
      body: {
        query: {
          match: {
            Quote: searchInput
          }
        }
      }
    });

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
  // const result = await searchExample(searchInput);
  // console.log(result);
  // res.setHeader('Content-Type', 'application/json');
  // res.writeHead(200);
  // res.end(JSON.stringify(result));
})


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
