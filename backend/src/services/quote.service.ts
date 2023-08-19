import Quote from "../model/quote.model";
import { Client } from '@opensearch-project/opensearch';


export default class QuoteService {
    constructor(private dbClient: Client) {}
    async searchQuote(searchInput : string, category: string) {
        try {
          const response = await this.dbClient.search({
            index: 'quotes',
            body: {
              query: {
                match_phrase_prefix: {
                  category : searchInput
                }
              }
            }
          });
          const results = response.body.hits.hits.map((hit: any) => {
            return hit._source as Quote;
          })
          console.log(results);
          return results as Quote[]
      
        } catch (error) {
          console.error('Error:', error);
        }
      }
}