import express from 'express';
import { Client, ClientOptions } from '@opensearch-project/opensearch';

const app = express();
const port = 3000;

const opensearchOptions: ClientOptions = {
  node: 'https://search-quotefinder-domain-4d6q4o7wusbnalmlfr24rlqphy.af-south-1.es.amazonaws.com/', // OpenSearch server URL
  cloud: {
    id: 'quotes',
    username: 'admin',
    password: 'QuoteFinder123!',
  }
};

const opensearchClient = new Client(opensearchOptions);

app.get('/api/quotes', async (req, res) => {
  try {
    const response = await opensearchClient.search({
      index: 'quotes', // Your OpenSearch index name
      body: {
        // Your OpenSearch query
      },
    });

    res.json(response.body.hits.hits);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
