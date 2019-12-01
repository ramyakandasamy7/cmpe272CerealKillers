var oktaSignIn = new OktaSignIn({
        baseUrl: "https://dev-880333.okta.com",
        clientId: "0oa1x2i9ib9RY8NTc357",
        authParams: {
                issuer: "https://dev-880333.okta.com/oauth2/default",
                responseType: ['token', 'id_token'],
                display: 'page'
        }
});
var HOME = 'http://hr.mymsseprojects.com';
var idToken;
var accessToken;
var employee_info;
console.log(oktaSignIn);

function checkForTokens(osi) {
        if (osi.hasTokensInUrl()) {
                console.log("Tokens in URL");
                osi.authClient.token.parseFromUrl().then(function(tokens) {
                        for (i in tokens) {
                                if (tokens[i].idToken) {
					console.log("Found idToken from URL");
                                        osi.authClient.tokenManager.add('idToken',tokens[i]);
					window.idToken = tokens[i];
                                }
                                if (tokens[i].accessToken) {
					console.log("Found accessToken from URL");
                                        osi.authClient.tokenManager.add('accessToken',tokens[i]);
					window.accessToken = tokens[i];
                                }
                        }
			location.replace(window.HOME);
                });
                return true;
        } else if (window.localStorage.getItem('okta-token-storage') !== null) {
                console.log("Tokens in localStorage");
                let tokens = JSON.parse( window.localStorage.getItem('okta-token-storage') );
		window.idToken = tokens.idToken;
		window.accessToken = tokens.accessToken;
                history.pushState("", document.title, window.location.pathname);
                return true;
        } else {
                console.log("No tokens");
                history.pushState("", document.title, window.location.pathname);
                return false;
        }
}

function goToDashboard() {
	location.replace(window.HOME);
}

function getEmployeeInfo() {
        window.employee_info = JSON.parse(localStorage.getItem("einfo"));
        if (window.employee_info == null) {
                location.replace(window.HOME);
        }
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
                        window.localStorage.removeItem('einfo');
			location.replace(window.HOME);
                        //renderLogin(osi);
                }
        });
}
