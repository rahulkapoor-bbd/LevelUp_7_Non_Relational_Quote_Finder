import services from "../services"

export const searchQuote = async (quote: string, category: string) => {
    try {
        let response = await services.quoteService.searchQuote(quote, category);
        return response
    } catch (error) {
        console.error('Error:', error);
    }
}