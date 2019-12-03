var pubip;

function initUI(pubip) {
	window.pubip = pubip
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
		+"<div class='container-fluid' id='table_container'>"
			+"<h2 id='payroll_title'></h2>"
			
		+"</div>"
	);
}

function getPayrollData() {
	let einfo = window.employee_info;

	console.log(einfo);

	if (einfo.is_manager == "1") {
		$("#payroll_title").append("Payroll for "+einfo.dept_name+" Department ("+einfo.dept_no+")");
		$("#table_container").append(
			"<table class='table table-striped table-sm' id='payroll_table'>"
				+"<thead>"
					+"<tr>"
						+"<th>Employee ID</th>"
						+"<th>Employee Name</th>"
						+"<th>Date Paid</th>"
						+"<th>Hourly Rate $</th>"
						+"<th>Hours Paid</th>"
						+"<th>Total Paid $</th>"
						+"<th>Tax %</th>"
						+"<th>PTO Rate</th>"
					+"</tr>"
				+"</thead>"

			+"</table>"
		);
		$.ajax({
			url: 'http://'+window.pubip+':3000/payrolls/'+einfo.dept_no,
			type: 'GET',
			dataType: 'json'
		}).done(function(data, message, stat) {
			console.log(data);
			if (stat.status === 200) {
				for (i in data) {
					data[i].rate       = "$"+ data[i].rate;
					data[i].total_paid = "$"+ data[i].total_paid;
					data[i].name       = data[i].first_name+" "+data[i].last_name;
				}
				$("#payroll_table").DataTable({
					"pageLength": 10,
					"data": data,
					"columns": [
						{ "data": "emp_no"     },
						{ "data": "name"       },
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
		$("#table_container").append(
			"<table class='table table-striped table-sm' id='payroll_table'>"
				+"<thead>"
					+"<tr>"
						+"<th>Date Paid</th>"
						+"<th>Hourly Rate $</th>"
						+"<th>Hours Paid</th>"
						+"<th>Total Paid $</th>"
						+"<th>Tax %</th>"
						+"<th>PTO Rate</th>"
					+"</tr>"
				+"</thead>"

			+"</table>"
		);
		$.ajax({
			url: 'http://'+window.pubip+':3000/payroll/'+einfo.emp_no,
			type: 'GET',
			dataType: 'json'
		}).done(function(data, message, stat) {
			console.log(data);
			if (stat.status === 200) {
				for (i in data) {
                                        data[i].rate       = "$"+ data[i].rate;
                                        data[i].total_paid = "$"+ data[i].total_paid;
                                }
				$("#payroll_table").DataTable({
					"pageLength": 10,
					"data": data,
					"columns": [
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
