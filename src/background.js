// Requirements: General purpose, English, HTTPS
var searchProviders = {
    "duckduckgo" : "https://duckduckgo.com/?q=",
    "ixquick" : "https://ixquick.com/do/search?q=",
    "yahoo" : "https://search.yahoo.com/search?q=",
    "bing" : "https://www.bing.com/search?q=",
    "gigablast" : "https://www.gigablast.com/search?q=",
    "google" : "https://www.google.no/search?q=",
    "yandex" : "https://www.yandex.com/yandsearch?text="
  },
  searchProvidersKeys = Object.keys( searchProviders );

function searchHandler( input )
{
  var input = input.trim(),
    guessProviderKeyword = input.split( " " )[0];
  // Search specific provider using keyword
  if ( ( guessProviderKeyword in searchProviders ) && guessProviderKeyword.length < input.length + 2 )
  {
    var keywordStrippedInput = input.slice( guessProviderKeyword.length + 1, input.lenght ),
      encodedInput = encodeURIComponent( keywordStrippedInput );
    return searchProviders[ guessProviderKeyword ] + encodedInput;
  }
  // Search using a random provider
  else
  {
    var randProviderKey = searchProvidersKeys[ Math.floor( Math.random() * searchProvidersKeys.length ) ],
      providerURL = searchProviders[ randProviderKey ],
      encodedInput = encodeURIComponent( input );
    return providerURL + encodedInput;
  }
}

function inputHandler( input )
{
  if ( input )
  {
    chrome.tabs.query(
      { 'currentWindow': true, 'active': true },
      function( tab )
      {
        chrome.tabs.update( tab[0].id, { "url" : searchHandler( input ) } );
      }
    )
  }
}

chrome.omnibox.onInputEntered.addListener( inputHandler );
