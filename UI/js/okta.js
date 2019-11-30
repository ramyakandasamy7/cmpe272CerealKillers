var oktaSignIn = new OktaSignIn({
        baseUrl: "https://dev-880333.okta.com",
        clientId: "0oa1x2i9ib9RY8NTc357",
        authParams: {
                issuer: "https://dev-880333.okta.com/oauth2/default",
                responseType: ['token', 'id_token'],
                display: 'page'
        }
});
var idToken;
var accessToken;
console.log(oktaSignIn);

function checkForTokens(osi) {
        if (osi.hasTokensInUrl()) {
                console.log("Tokens in URL");
                osi.authClient.token.parseFromUrl().then(function(tokens) {
                        for (i in tokens) {
                                if (tokens[i].idToken) {
                                        osi.authClient.tokenManager.add('idToken',tokens[i]);
                                }
                                if (tokens[i].accessToken) {
                                        osi.authClient.tokenManager.add('accessToken',tokens[i]);
                                }
                        }
                });
                return true;
        } else if (window.localStorage.getItem('okta-token-storage') !== null) {
                console.log("Tokens in localStorage");
                let tokens = JSON.parse( window.localStorage.getItem('okta-token-storage') );
                console.log(tokens);
                window.idToken     = tokens.idToken;
                window.accessToken = tokens.accessToken;
                console.log(window.accessToken);
                console.log(window.idToken);
                history.pushState("", document.title, window.location.pathname);
                return true;
        } else {
                console.log("No tokens");
                history.pushState("", document.title, window.location.pathname);
                return false;
        }
}

function goToDashboard() {
	location.replace("http://hr.mymsseprojects.com");
}

function logout() {
        let osi = window.oktaSignIn;
        osi.authClient.session.close().then(function(err) {
                if (err) {
                        console.log(err);
                } else {
                        console.log("logout");
                        $('#root').empty();
                        window.localStorage.removeItem('okta-token-storage');
			location.replace('http://hr.mymsseprojects.com');
                        //renderLogin(osi);
                }
        });
}
