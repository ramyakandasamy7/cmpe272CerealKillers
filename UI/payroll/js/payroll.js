
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
			+"<h2 id='payroll_title'></h2>"
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
		$("#payroll_title").append("Payroll for "+einfo.dept_name+" Department ("+einfo.dept_no+")");
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
		$("#payroll_title").append("Payroll for "+einfo.first_name+" "+einfo.last_name+" ("+einfo.emp_no+")");
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
