const searchBar = document.getElementById("search-bar") as HTMLInputElement;
const searchResults = document.getElementById("search-results") as HTMLDivElement;
const searchButton = document.getElementById("search-button") as HTMLButtonElement;
const categories = document.querySelectorAll<HTMLDivElement>(".category");

let selectedCategory: string = "quote";

function handleCategoryClick(event: MouseEvent) {
  const clickedCategory = (event.target as HTMLDivElement).dataset.category;

  if (clickedCategory !== selectedCategory) {
    categories.forEach((category) => {
      if (category.dataset.category === selectedCategory) {
        category.classList.remove("selected");
      }
    });

    (event.target as HTMLDivElement).classList.add("selected");
    selectedCategory = clickedCategory || "quote";

    searchBar.placeholder = `Enter ${selectedCategory} keywords`;
  }

  searchBar.value = "";
  searchBar.placeholder = `Enter ${selectedCategory} keywords`;
}

categories.forEach((category) => {
  category.addEventListener("click", handleCategoryClick);
});

function onResultPress(result: any) {
  window.location.href = `results.html?quote=${result.Quote}&category=${selectedCategory}`;
}

searchButton.addEventListener('click', function () {
  window.location.href = `results.html?searchText=${searchBar.value}&category=${selectedCategory}`;
});

let debounceTimeout: ReturnType<typeof setTimeout>;

searchBar.addEventListener('input', function (e) {

  if (e.target instanceof HTMLInputElement) {
    clearTimeout(debounceTimeout);

    const query = e.target.value.trim();

    function fetchData() {
      searchResults.innerText = '';
      searchResults.classList.remove('visible');

      const categorySelected = selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1);

      if (query.length >= 3) {
        const quoteEndpoint = `https://axnebcpkzz.eu-west-1.awsapprunner.com/quote/search/${categorySelected}/${query}`;
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
                noResults.textContent = 'No results';
                searchResults.appendChild(noResults);
                searchResults.classList.add('visible');
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