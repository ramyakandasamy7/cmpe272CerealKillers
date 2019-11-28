
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
console.log(oktaSignIn);

function initUI() {
	if (checkForTokens(window.oktaSignIn) === true) {
		renderContainers();
	} else {
		renderLogin(window.oktaSignIn);
	}

}

function logout() {
	let osi = window.oktaSignIn;
	osi.authClient.session.close().then(function(err) {
		if (err) {
			console.log(err);
		} else {
			$('#root').empty();
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
	console.log(osi.hasTokensInUrl());
	if (osi.hasTokensInUrl()) {
		console.log("I HAVE TOKENS");
		osi.authClient.token.parseFromUrl().then(function success(tokens) {
			console.log(tokens);
			for (i in tokens){
				if (tokens[i].idToken) {
					osi.authClient.tokenManager.add('idToken', tokens[i]);
					console.log("Found idToken");
				}
				if (tokens[i].accessToken) {
					osi.authClient.tokenManager.add('accessToken', tokens[i]); 
					console.log("Found accessToken");
				}
			}
			console.log(osi);
			window.idToken = osi.authClient.tokenManager.get('idToken');
			console.log(window.idToken.claims.email);
			window.location.hash='';
		});
		//console.log(window.token);
		//access_token = osi.authClient.tokenManager.get('access_token');
		//console.log(access_token);
		//window.userInfo = osi.authClient.token.getUserInfo(access_token);
		//console.log(window.userInfo);
		return true;
	} else {
		console.log("I DONT HAVE TOKENS");
		osi.authClient.session.get().then(function(ses) {
			if (ses.status === 'ACTIVE') {
				console.log(ses);
				window.login = ses.login;
				osi.authClient.tokenManager.add('id_token', ses[0]);
				osi.authClient.tokenManager.add('access_token', ses[1]);
				console.log("osi");
				return true;
			} else {
				renderLogin(osi);		
				console.log(osi);
			}
		//}).catch(function(err) {
		//	console.log(err);
		//	return false;
		});
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
