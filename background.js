function searchURI ( encodedInput )
{
  var searchProviders = [
    // Requirements: General purpose, English, HTTPS
    "duckduckgo" => "https://duckduckgo.com/?q=",
    "https://ixquick.com/do/search?q=",
    "https://search.yahoo.com/search?q=",
    "https://www.bing.com/search?q=",
    "https://www.gigablast.com/search?q=",
    "https://www.google.no/search?q=",
    "https://www.yandex.com/yandsearch?text="
  ],
  ranArrLenNum = Math.floor( Math.random() * searchProviders.length ),
  provider = searchProviders[ ranArrLenNum ];
  return provider + encodedInput
}

function inputHandler( input )
{
  if ( input )
  {
    var encodedInput = encodeURIComponent( input );
    chrome.tabs.query(
      { 'currentWindow': true, 'active': true },
      function( tab )
      {
        chrome.tabs.update( tab[0].id, { "url" : searchURI( encodedInput ) } );
      }
    )
  }
}

chrome.omnibox.onInputEntered.addListener( inputHandler );
