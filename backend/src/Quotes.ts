class Quotes
{
    id:number;
    Person : string;
    Occupation : string[];
    Date : number;
    Location : string[];
    Quote : string;
    Source : string;

    constructor(id: number, person: string, occupation: string[], date : number, location: string[], quote: string, source: string)
    {
        this.id = id;
        this.Person = person;
        this.Occupation = occupation;
        this.Date = date;
        this.Location = location;
        this.Quote = quote;
        this.Source = source
    }
    
}

export default Quotes;