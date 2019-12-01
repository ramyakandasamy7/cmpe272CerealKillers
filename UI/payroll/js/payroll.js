
function initUI() {
	let hasTokens = checkForTokens(window.oktaSignIn);
        if (hasTokens === true) {
		getEmployeeInfo();
                renderContainers();
		getPayrollData();
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
			+"<h2>Payroll History for "+window.employee_info.first_name+" "+window.employee_info.last_name+"</h2>"
			+"<table class='table table-striped table-sm' id='payroll_table'>"
				+"<thead>"
					+"<tr>"
						+"<th>Employee ID</th>"
						+"<th>Date Paid</th>"
						+"<th>Hourly Rate $</th>"
						+"<th>Hours Paid</th>"
						+"<th>Total Paid $</th>"
						+"<th>Tax %</th>"
						+"<th>PTO Rate</th>"
					+"</tr>"
				+"</thead>"

			+"</table>"
		+"</div>"
	);
}

function getPayrollData() {
	let einfo = window.employee_info;

	console.log(einfo);

	if (einfo.is_manager == "1") {
		$.ajax({
			url: 'http://54.165.80.211:3000/payrolls/'+einfo.dept_no,
			type: 'GET',
			dataType: 'json'
		}).done(function(data, message, stat) {
			console.log(data);
			if (stat.status === 200) {
				$("#payroll_table").DataTable({
					"pageLength": 10,
					"data": data,
					"columns": [
						{ "data": "emp_no"     },
						{ "data": "date_paid"  },
						{ "data": "rate"       },
						{ "data": "hours_paid" },
						{ "data": "total_paid" },
						{ "data": "tax_taken"  },
						{ "data": "pto_rate"   }
					]
				});
			}
		});
	} else {
		$.ajax({
			url: 'http://54.165.80.211:3000/payroll/'+einfo.emp_no,
			type: 'GET',
			dataType: 'json'
		}).done(function(data, message, stat) {
			if (stat.status === 200) {
				$("#payroll_table").DataTable({
					"pageLength": 10,
					"data": data,
					"columns": [
						{ "data": "emp_no"     },
						{ "data": "date_paid"  },
						{ "data": "rate"       },
						{ "data": "hours_paid" },
						{ "data": "total_paid" },
						{ "data": "tax_taken"  },
						{ "data": "pto_rate"   }
					]
				});
			}
		});
	}
}
