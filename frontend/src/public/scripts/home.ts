const searchBar = document.getElementById("search-bar") as HTMLInputElement;
const searchResults = document.getElementById("search-results") as HTMLDivElement;
const searchButton = document.getElementById("search-button") as HTMLButtonElement;

function onResultPress(result: any) {
  window.location.href = `results.html?quote=${result.Quote}`;
}

searchButton.addEventListener('click', function () {
  window.location.href = `results.html?searchText=${searchBar.value}`;
});

let debounceTimeout: ReturnType<typeof setTimeout>;

searchBar.addEventListener('input', function (e) {

  if (e.target instanceof HTMLInputElement) {
    clearTimeout(debounceTimeout);

    const query = e.target.value.trim();

    function fetchData() {
      searchResults.innerText = '';
      searchResults.classList.remove('visible');

      if (query.length >= 3) {
        const quoteEndpoint = `https://axnebcpkzz.eu-west-1.awsapprunner.com/quote/search/Quote/${query}`;
        try {
          fetch(quoteEndpoint)
            .then((response) => response.json())
            .then((data) => {
              if (data.length > 0) {
                data.forEach((result: any, index: number) => {
                  const singleResult = document.createElement('div');
                  singleResult.textContent = `${result.Quote} - ${result.Person}`;
                  singleResult.classList.add('result-item');

                  singleResult.addEventListener('click', () => {
                    onResultPress(result);
                  });

                  singleResult.addEventListener('mouseover', () => {
                    singleResult.style.backgroundColor = '#eee';
                  });

                  singleResult.addEventListener('mouseout', () => {
                    singleResult.style.backgroundColor = 'white';
                  });
                  searchResults.appendChild(singleResult);

                  if (index < data.length - 1) {
                    const separator = document.createElement('hr');
                    searchResults.appendChild(separator);
                  }
                });

                searchResults.classList.add('visible');
              } else {
                const noResults = document.createElement('div');
                noResults.textContent = 'Quote not found';
                searchResults.appendChild(noResults);
              }
            })
            .catch((error) => {
              console.error('Error fetching data:', error);
            });
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
    }

    debounceTimeout = setTimeout(fetchData, 500);
  }
});