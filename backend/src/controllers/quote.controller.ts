import services from "../services"

export const searchQuote = async (quote: string) => {
    try {
        let response = await services.quoteService.searchQuote(quote);
        return response
    } catch (error) {
        console.error('Error:', error);
    }
}