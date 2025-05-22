const searchBox = document.getElementById('search');  // matches input id="serach"
const list = document.querySelectorAll('.companies');
const notFoundMessage = document.getElementById('notFoundMessage');

searchBox.addEventListener('input', function() {
  const searchTerm = this.value.toLowerCase().trim();
  let found = false;

  list.forEach(function(item) {
    const text = item.textContent.toLowerCase();
    if (text.includes(searchTerm)) {
      item.style.display = ''; // show
      found = true;
    } else {
      item.style.display = 'none'; // hide
    }
  });

  if (!found) {
    notFoundMessage.style.display = 'block'; // show message
  } else {
    notFoundMessage.style.display = 'none';  // hide message
  }
});
