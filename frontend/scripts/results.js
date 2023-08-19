const searchBar = document.getElementById('search-bar');

searchBar.addEventListener('input', debounce(() => {
  const inputValue = searchBar.value;
  
  if (inputValue.length >= 3) {
    searchForQuote(inputValue);
  }
}, 300));

function searchForQuote(category, query) {
  fetch(`http://localhost:3000/quote/search/${category}/${query}`)
    .then(response => response.json())
    .then(data => {
      console.log(data);
    })
    .catch(error => {
      console.error('Quote search error:', error);
    });
}

function debounce(func, delay) {
  let timer;
  return function() {
    clearTimeout(timer);
    timer = setTimeout(func, delay);
  };
}