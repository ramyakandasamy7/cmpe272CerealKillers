
function initUI() {
	let hasTokens = checkForTokens(window.oktaSignIn);
        if (hasTokens === true) {
                renderContainers();
        } else {
                location.replace('http://hr.mymsseprojects.com');
        }
}

function renderContainers() {
	$('#root').append(
                "<nav aria-label='breadcrumb' class='navbar navbar-light bg-dark'>"
			+"<ol class='breadcrumb' style='margin-top: 10px;'>"
                        	+"<li class='breadcrumb-item'><a href='http://hr.mymsseprojects.com'>Zen HR</a></li>"
				+"<li class='breadcrumb-item active'>Payroll</li>"
			+"</ol>"
                        +"<button type='button' class=' btn pull-right' title='Logout' onclick='logout();'>"
                                +"<i class='fas fa-sign-out-alt fa-2x' style='color: #cccccc'></i>"
                        +"</button>"
                +"</nav>"	
		+"<div class='container-fluid'>"
			+"<h2>Payroll History</h2>"
			+"<table class='table table-striped'>"
				+"<thead>"
					+"<tr>"
						+"<th>Payroll Cycle</th>"
						+"<th>Hourly Rate</th>"
						+"<th>Hours Paid</th>"
						+"<th>Tax</th>"
						+"<th>Medical</th>"
						+"<th>Dental</th>"
						+"<th>PTO/Payroll</th>"
						+"<th>Available PTO</th>"
					+"</tr>"
				+"</thead>"

			+"</table>"
		+"</div>"
	);
}
