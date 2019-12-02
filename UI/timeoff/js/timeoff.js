
function initUI() {
	let hasTokens = checkForTokens(window.oktaSignIn);
        if (hasTokens === true) {
                renderContainers();
		getEmployeeInfo();
		getData();
        } else {
                location.replace('http://hr.mymsseprojects.com');
        }
}

function approve(timeoffId) {
	$.ajax({
		url: "http://54.165.80.211:4000/timeoffstatus",
		type: "POST",
		data: {status:"Approved",requestid:timeoffId},
		dataType: "json"
	}).done(function(data, message, stat) {
		if (stat.status === 200) {
			location.reload();
		}
	});
}

function decline(timeoffId) {
	$.ajax({
		url: "http://54.165.80.211:4000/timeoffstatus",
		type: "POST",
		data: {status:"Declined",requestid:timeoffId},
		dataType: "json"
	}).done(function(data, message, stat) {
		if (stat.status === 200) {
			location.reload();
		}
	});
}

function renderContainers() {
	$('#root').append(
                "<nav aria-label='breadcrumb' class='navbar navbar-light bg-dark'>"
			+"<ol class='breadcrumb' style='margin-top: 10px;'>"
                        	+"<li class='breadcrumb-item'><a href='http://hr.mymsseprojects.com'>Zen HR</a></li>"
				+"<li class='breadcrumb-item active'>Paid Time Off</li>"
			+"</ol>"
                        +"<button type='button' class=' btn pull-right' title='Logout' onclick='logout();'>"
                                +"<i class='fas fa-sign-out-alt fa-2x' style='color: #cccccc'></i>"
                        +"</button>"
                +"</nav>"	
		+"<div class='container-fluid' id='request_off'>"
			+"<h2>Request Time Off</h2>"
			+"<table class='table table-striped'>"
				+"<thead>"
					+"<tr>"
						+"<th>Start Date</th>"
						+"<th>End Date</th>"
						+"<th>Available PTO </th>"
						+"<th>Total Work Hours</th>"
						+"<th>PTO After Approval</th>"
					+"</tr>"
				+"</thead>"
				+"<tbody>"
					+"<tr>"
						+"<td><input type='text' id='datepicker-start' onchange='updateTotalWorkHours();'></td>"
						+"<td><input type='text' id='datepicker-end' onchange='updateTotalWorkHours();'></td>"
						+"<td><h2 id='available_pto'></h2></td>"
						+"<td><h2 id='total_work_hours'></h2></td>"
						+"<td><h2 id='pto_after_approval'></h2></td>"
					+"</tr>"
				+"</tbody>"
			+"</table>"
			+"<button type='button' class='btn btn-primary' onclick='submitTimeOff();'>Submit</button>"
		+"</div>"
	);
	$("#datepicker-start").datepicker({minDate: 0, beforeShowDay: $.datepicker.noWeekends});
	$("#datepicker-end").datepicker({minDate: 0, beforeShowDay: $.datepicker.noWeekends});
}

function updateTotalWorkHours() {
	let sDate = new Date( $("#datepicker-start").val() );
	let eDate = new Date( $("#datepicker-end").val() );

	if (sDate.toString() != "Invalid Date" && eDate.toString() != "Invalid Date") {
		let total_hours = ((eDate - sDate)/(1000*60*60*24)*8)+8;
		let apto = $("#available_pto").html();
		if (total_hours > 40 && total_hours < 104) { total_hours -= 16;}
		else if (total_hours > 104 && total_hours < 160) { total_hours -= 32;}
		else if (total_hours > 152 && total_hours < 216) { total_hours -= 48;}
		let paa  = apto - total_hours;
		$("#total_work_hours").empty();
		$("#total_work_hours").append(total_hours);
		$("#pto_after_approval").empty();
		$("#pto_after_approval").append(paa);
	}
}

function submitTimeOff() {
	let sDate  = new Date( $("#datepicker-start").val() );
	let eDate  = new Date( $("#datepicker-end").val() );
	let emp_id = window.employee_info.emp_no;

	if (sDate.toString() != "Invalid Date" && eDate.toString() != "Invalid Date") {
		let total_hours = ((eDate - sDate)/(1000*60*60*24)*8)+8;
		let start_year  = sDate.getFullYear(); 
		let start_month = (sDate.getMonth() > 8) ? (sDate.getMonth() + 1) : ('0' + (sDate.getMonth() +1));
		let start_day   = (sDate.getDate() > 9) ? sDate.getDate() : ('0' + sDate.getDate());
		let end_year    = eDate.getFullYear(); 
		let end_month   = (eDate.getMonth() > 8) ? (eDate.getMonth() + 1) : ('0' + (eDate.getMonth() +1));
		let end_day     = (eDate.getDate() > 9) ? eDate.getDate() : ('0' + eDate.getDate());
		let start_date  = start_year+"-"+start_month+"-"+start_day;
		let end_date    = end_year+"-"+end_month+"-"+end_day;
		if (total_hours > 40 && total_hours < 104) { total_hours -= 16;}
		else if (total_hours > 104 && total_hours < 160) { total_hours -= 32;}
		else if (total_hours > 152 && total_hours < 216) { total_hours -= 48;}
		if (total_hours > 0) {
			$.ajax({
				url: "http://54.165.80.211:4000/createRequest",
				type: "POST",
				data: {emp_id:emp_id, start_date:start_date, end_date:end_date, num_hours: total_hours, manager_email:"jed.villanueva86@gmail.com"},
			}).done(function(data, message, stat) {
				if (stat.status === 200) {
					alert("Time off request successfully sent!\nPlease wait for you manager to confirm before taking the requested time off.");
				} else {
					alert(stat.responseText);
				}
			});
		} else {
			alert("The end date cannot be before the start date. That's just silly. We don't give negative PTOs.");
			return;
		}
	} else {
		alert("Please make sure to select both the start date and end date!");
		return;
	}
}

function getData() {
	let einfo = window.employee_info;
	let id = einfo.emp_no;
	let dn = einfo.dept_no;
	console.log(einfo);


	if (einfo.is_manager == "1") {
		//$("#request_off").empty();
		$("#root").append(
			"<div class='container-fluid' style='margin-bottom: 40px;'>"
			+"<h2>Time Off Request ["+einfo.dept_name+" Department ("+einfo.dept_no+")]</h2>"
			+"<table class='table table-striped' id='timeoff_requests_table'>"
				+"<thead>"
					+"<tr>"
						+"<th>Employee ID</th>"
						+"<th>Start Date</th>"
						+"<th>End Date</th>"
						+"<th>Status</th>"
						+"<th>Number Of Hours</th>"
						+"<th>Approve/Decline</th>"
					+"</tr>"
				+"</thead>"
				+"<tbody>"
				+"</tbody>"
			+"</table>"
		+"</div>"
		);
		$.ajax({
			url: "http://54.165.80.211:4000/department/"+dn,
			type: "GET",
			dataType: "json"
		}).done(function(data, message, stat) {
			if (stat.status === 200) {
				console.log(data);
				for (i in data.data) {
					if (data.data[i].status === "Pending") {
						data.data[i]['option'] = "<button type='button' class='btn btn-primary btn-sm' onclick='approve("+data.data[i].id+")'>Approve</button>";
						data.data[i]['option'] += "<button type='button' class='btn btn-danger btn-sm' onclick='decline("+data.data[i].id+")'>Decline</button>";
					} else {
						data.data[i]['option'] = data.data[i].status;
					}
				}
				$("#timeoff_requests_table").DataTable({
                                        "pageLength": 10,
                                        "data": data.data,
                                        "columns": [
                                                { "data": "employee_id"   },
                                                { "data": "start_date"    },
                                                { "data": "end_date"      },
                                                { "data": "status"        },
                                                { "data": "numberofhours" },
                                                { "data": "option"        }
                                        ]
                                });
			}
		});
	} else {
		$.ajax({
			url: "http://54.165.80.211:4000/employee/"+id,
			type: "GET",
			dataType: "json"
		}).done(function(data, message, stat) {
			console.log(data);
			if (stat.status === 200) {
				$("#available_pto").append(data.available_pto);
			} else {
				alert("Error: "+stat.responseText);
			}
		});
	}
}
