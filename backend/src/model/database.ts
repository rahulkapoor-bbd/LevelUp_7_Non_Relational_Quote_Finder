import { Client } from '@opensearch-project/opensearch';
import dotenv from 'dotenv';

dotenv.config();

const DBClient = (): Client => {
    return new Client({
        node: process.env.NODE_SERVER,
        auth:{
            username:process.env.OS_USERNAME || '',
            password:process.env.PASSWORD || ''
        }
    })
  };

export default DBClient;