const searchBar = document.getElementById('search-bar') as HTMLInputElement;
const resultsList = document.getElementById('results-list') as HTMLElement;

searchBar.addEventListener('input', debounce(() => {
  const inputValue = searchBar.value;
  
  if (inputValue.length >= 3) {
    searchForQuote(inputValue);
  }
}, 300));

function searchForQuote(query: string) {
  const category = "Quote";
  fetch(`${process.env.API_URL}/quote/search/${category}/${query}`)
    .then(response => response.json())
    .then(data => {
      displayResults(data);
      console.log(JSON.stringify(data));
    })
    .catch(error => {
      console.error('Quote search error:', error);
    });
}

function displayResults(results: any[]) {
  resultsList.innerText = '';

  results.forEach(result => {
    const card = createCard(result);
    resultsList.appendChild(card);
  });
}

function createCard(result: any): HTMLElement {
  const card = document.createElement('div');
  card.className = 'result-card';

  const quote = document.createElement('p');
  quote.className = 'quote';
  quote.textContent = `"${result.Quote}" - ${result.Person}`;
  card.appendChild(quote);

  const infoDiv1 = createInfoDiv(`Source: ${result.Source}`, `Location: ${result.Location}`);
  const infoDiv2 = createInfoDiv(`Date: ${result.Date}`, `Occupation: ${result.Occupation}`);

  card.appendChild(infoDiv1);
  card.appendChild(infoDiv2);

  return card;
}

function createInfoDiv(leftText: string, rightText: string): HTMLElement {
  const infoDiv = document.createElement('div');
  infoDiv.className = 'info';

  const leftParagraph = document.createElement('p');
  leftParagraph.textContent = leftText;
  infoDiv.appendChild(leftParagraph);

  const rightParagraph = document.createElement('p');
  rightParagraph.textContent = rightText;
  infoDiv.appendChild(rightParagraph);

  return infoDiv;
}

function debounce(func: () => void, delay: number) {
  let timer: ReturnType<typeof setTimeout>;
  return function() {
    clearTimeout(timer);
    timer = setTimeout(func, delay);
  };
}
