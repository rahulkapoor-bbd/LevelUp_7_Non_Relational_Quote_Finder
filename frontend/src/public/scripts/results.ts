const searchBar_ = document.getElementById('search-bar') as HTMLInputElement;
const resultsList = document.getElementById('results-list') as HTMLElement;

const categoriesResultsPage = document.querySelectorAll<HTMLDivElement>(".category");

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const quote = urlParams.get('quote');
const searchText = urlParams.get('searchText');
const categoryUrl = urlParams.get('category');

let selectedCategoryResultsPage: string = categoryUrl || "quote";

categoriesResultsPage.forEach((category) => {
  if (category.dataset.category === selectedCategoryResultsPage) {
    category.classList.add("selected");
  } else {
    category.classList.remove("selected");
  }
});

function handleCategoryClickResultsPage(event: MouseEvent) {
  const clickedCategory = (event.target as HTMLDivElement).dataset.category;

  if (clickedCategory !== selectedCategoryResultsPage) {
    categoriesResultsPage.forEach((category) => {
      if (category.dataset.category === selectedCategoryResultsPage) {
        category.classList.remove("selected");
      }
    });

    (event.target as HTMLDivElement).classList.add("selected");
    selectedCategoryResultsPage = clickedCategory || "quote";

    searchBar_.placeholder = `Enter ${selectedCategoryResultsPage} keywords`;
  }

  searchForQuote(searchBar_.value);
}

categoriesResultsPage.forEach((category) => {
  category.addEventListener("click", handleCategoryClickResultsPage);
});


if (!!quote) {
  searchBar_.value = quote;
  searchForQuote(quote);
}

if (!!searchText) {
  searchBar_.value = searchText;
  searchForQuote(searchText);
}

searchBar_.addEventListener('input', debounce(() => {
  const inputValue = searchBar_.value;

  if (inputValue.length >= 3) {
    resultsList.innerText = '';
    searchForQuote(inputValue);
  } else {
    resultsList.innerText = '';
  }
}, 300));

function searchForQuote(query: string) {

  const category = selectedCategoryResultsPage.charAt(0).toUpperCase() + selectedCategoryResultsPage.slice(1);

  fetch(`https://axnebcpkzz.eu-west-1.awsapprunner.com/quote/search/${category}/${query}`)
    .then(response => response.json())
    .then(data => {
      if (data.length > 0) {
        displayResults(data);
      } else {
        if (resultsList.childElementCount === 0) {
          const card = document.createElement('div');
          card.className = 'result-card';

          const noResults = document.createElement('p');
          noResults.className = 'quote';
          noResults.textContent = "No results";
          card.appendChild(noResults);
          resultsList.appendChild(card);
        }
      }
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
  return function () {
    clearTimeout(timer);
    timer = setTimeout(func, delay);
  };
}
