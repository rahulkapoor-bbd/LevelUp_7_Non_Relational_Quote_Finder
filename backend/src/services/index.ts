import DBClient from "../model/database";
import QuoteService from "./quote.service";

const dbClient = DBClient();

const quoteService: QuoteService = new QuoteService(dbClient);

export default {
    quoteService
};