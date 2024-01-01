let searchBtn = document.querySelector('.li-btn');

///// ----- add to cart under get One product preview script ----- /////
searchBtn.addEventListener('click', async (e) => {
  e.preventDefault();

  let searchKeyword = document.querySelector('#searchInput').value.trim();

  if (!searchKeyword) {
    console.log('I have return due to the fact that the input is empty');
    return;
  }

  console.log(typeof searchKeyword, searchKeyword);

  //Validate User message for numbers
  function validateInput(searchKeyword) {
    const regex = /^[A-Za-z&_,\.]+$/;
    return regex.test(searchKeyword);
  }

  ///// ----- To validate if customer Subkect  ----- /////
  if (validateInput(searchKeyword)) {
    // The input contains only alphabet letters
  } else {
    // The input contains non-alphabet characters
    console.log('only alphabet is allowed');
    return;
  }

  /// ----- Send the id to server to search_query the database---- /////
  try {
    let response = await axios.get('/api/v1/result', {
      params: {
        search: `${searchKeyword}`,
      },
    });

    location.assign('/search_result');
  } catch (err) {
    console.log(err);
  }
});
