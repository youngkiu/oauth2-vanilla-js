OAuth Demo in Vanilla JS
=============================

Read more about this code: [Is the OAuth 2.0 Implicit Flow Dead?](https://developer.okta.com/blog/2019/05/01/is-the-oauth-implicit-flow-dead)

This is a demonstration of doing a complete OAuth Authorization Code flow in pure JavaScript. No external libraries are used.

To run this demo, you'll need to configure your OAuth server and client information in the HTML file.

This demonstration uses the following browser APIs which may not be available in all browsers:

* [window.crypto.getRandomValues](https://caniuse.com/#feat=getrandomvalues)
* [window.crypto.subtle.digest](https://caniuse.com/#feat=cryptography)
* [TextEncoder](https://caniuse.com/#feat=textencoder)

---

## Update the following variables in index.html

- CLIENT_ID
- REDIRECT_URI
- AUTHORIZATION_ENDPOINT
- OWN_SERVICE_TOKEN_ENDPOINT
- SCOPES 
