
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

function initUI() {
	let hasTokens = checkForTokens(window.oktaSignIn);
	//let hasTokens = true;
	console.log(hasTokens);
	if (hasTokens === true) {
		renderContainers();
	} else {
		console.log("initUI");
		renderLogin(window.oktaSignIn);
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
			renderLogin(osi);
		}
	});
}

function renderLogin(osi) {
	osi.renderEl({
		el: '#okta-login-container'
	}, function success(res) {
		console.log(res);
		if (res.status === 'SUCCESS') {
			res.session.setCookieAndRedirect('http://hr.mymsseprojects.com');
		}
	});
}

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
			//let tokens = JSON.parse( window.localStorage.getItem('okta-token-storage') );
			//console.log(tokens);
			//window.idToken 	   = tokens.idToken;
			//window.accessToken = tokens.accessToken;
			//console.log(window.accessToken);
			//console.log(window.idToken);
		});
		
		return true;
	} else if (window.localStorage.getItem('okta-token-storage') !== null) {
		console.log("Tokens in localStorage");
		let tokens = JSON.parse( window.localStorage.getItem('okta-token-storage') );
		console.log(tokens);
		window.idToken 	   = tokens.idToken;
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

function renderContainers() {
	$('#root').append(
		"<nav class='navbar navbar-light bg-dark'>"
			+"<span class='navbar-brand mb-0 h1 text-white'>Zen Dashboard</span>"
			+"<button type='button' class=' btn pull-right' title='Logout' onclick='logout();'>"
				+"<i class='fas fa-sign-out-alt fa-2x' style='color: #cccccc'></i>"
			+"</button>"
		+"</nav>"
		+"<div class='container-fluid' style='margin-top: 20px;'>"
			+"<div class='jumbotron jumbotron-fluid pointer slack-bg'>"
				+"<div class='container font-sz'>"
					+"<div class='row'>"
						+"<div class='col-6 my-auto'>"
							+"<h1 class='display-4'>Slack</h1>"
						+"</div>"
						+"<div class='col-6 text-right'>"
							+"<i class='fab fa-slack fa-6x text-white'></i>"
						+"</div>"
					+"</div>"
				+"</div>"
			+"</div>"
			+"<div class='jumbotron jumbotron-fluid pointer payroll-bg'>"
				+"<div class='container font-sz'>"
					+"<div class='row'>"
						+"<div class='col-6 my-auto'>"
							+"<h1 class='display-4'>Payroll</h1>"
						+"</div>"
						+"<div class='col-6 text-right'>"
							+"<i class='fas fa-money-check-alt fa-6x text-white'></i>"
						+"</div>"
					+"</div>"
				+"</div>"
			+"</div>"
			+"<div class='jumbotron jumbotron-fluid pointer timeoff-bg'>"
				+"<div class='container font-sz'>"
					+"<div class='row'>"
						+"<div class='col-6 my-auto'>"
							+"<h1 class='display-4'>Time-off</h1>"
						+"</div>"
						+"<div class='col-6 text-right'>"
							+"<i class='fas fa-calendar-alt fa-6x text-white'></i>"
						+"</div>"
					+"</div>"
				+"</div>"
			+"</div>"
			+"<div class='jumbotron jumbotron-fluid pointer expense-bg'>"
				+"<div class='container font-sz'>"
					+"<div class='row'>"
						+"<div class='col-6 my-auto'>"
							+"<h1 class='display-4'>Expense</h1>"
						+"</div>"
						+"<div class='col-6 text-right'>"
							+"<i class='fas fa-file-invoice-dollar fa-6x text-white'></i>"
						+"</div>"
					+"</div>"
				+"</div>"
			+"</div>"
		+"</div>"
	);
}
