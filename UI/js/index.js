
function initUI() {
	let hasTokens = checkForTokens(window.oktaSignIn);
	if (hasTokens === true) {
		renderContainers();
	} else {
		renderLogin(window.oktaSignIn);
	}

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

function renderContainers() {
	$('#root').append(
		"<nav class='navbar navbar-light bg-dark'>"
			+"<span class='navbar-brand mb-0 h1 text-white'>Zen HR Dashboard</span>"
			+"<button type='button' class=' btn pull-right' title='Logout' onclick='logout();'>"
				+"<i class='fas fa-sign-out-alt fa-2x' style='color: #cccccc'></i>"
			+"</button>"
		+"</nav>"
		+"<div class='container-fluid' style='margin-top: 20px;'>"
			+"<div class='jumbotron jumbotron-fluid pointer slack-bg' onclick='location.replace(\"https://cerealkillershq.slack.com\")'>"
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
			+"<div class='jumbotron jumbotron-fluid pointer payroll-bg' onclick='location.replace(\"http://hr.mymsseprojects.com/payroll\");'>"
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
			+"<div class='jumbotron jumbotron-fluid pointer timeoff-bg' onclick='location.replace(\"http://hr.mymsseprojects.com/timeoff\");'>"
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
			+"<div class='jumbotron jumbotron-fluid pointer expense-bg' onclick='location.replace(\"http://hr.mymsseprojects.com/expense\");'>"
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
