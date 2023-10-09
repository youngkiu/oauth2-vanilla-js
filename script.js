//////////////////////////////////////////////////////////////////////
// OAUTH REDIRECT HANDLING

// Handle the redirect back from the authorization server and
// get an access token from the token endpoint

var q = parseQueryString(window.location.search.substring(1));

// Check if the server returned an error string
if(q.error) {
  alert("Error returned from authorization server: "+q.error);
  document.getElementById("result").innerText = q.error+"\n\n"+q.error_description;
}

// If the server returned an authorization code, attempt to exchange it for an access token
if(q.code) {

  // Exchange the authorization code for an access token
  sendGetRequest('${SERVICE_TOKEN_ENDPOINT}', q.code, function(request, body) {

    localStorage.setItem("access_token", body.access_token);

    // Initialize your application now that you have an access token.
    // Here we just display it in the browser.
    document.getElementById("result").innerText = body.access_token;

    // Replace the history entry to remove the auth code from the browser address bar
    window.history.replaceState({}, null, "/");

  }, function(request, error) {
    // This could be an error response from the OAuth server, or an error because the
    // request failed such as if the OAuth server doesn't allow CORS requests
    document.getElementById("result").innerText = error.error+"\n\n"+error.error_description;
  });
}


//////////////////////////////////////////////////////////////////////
// GENERAL HELPER FUNCTIONS

// Make a POST request and parse the response as JSON
function sendGetRequest(url, code, success, error) {
  var request = new XMLHttpRequest();
  request.open('GET', `${url}?code=${code}`, true);
  request.onload = function() {
    var body = {};
    try {
      body = JSON.parse(request.response);
    } catch(e) {}

    if(request.status == 200) {
      success(request, body);
    } else {
      error(request, body);
    }
  }
  request.onerror = function() {
    error(request, {});
  }
  request.send();
}

// Parse a query string into an object
function parseQueryString(string) {
  if(string == "") { return {}; }
  var segments = string.split("&").map(s => s.split("=") );
  var queryString = {};
  segments.forEach(s => queryString[s[0]] = s[1]);
  return queryString;
}
