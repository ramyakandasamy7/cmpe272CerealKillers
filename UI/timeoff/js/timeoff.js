
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
				+"<li class='breadcrumb-item active'>Paid Time Off</li>"
			+"</ol>"
                        +"<button type='button' class=' btn pull-right' title='Logout' onclick='logout();'>"
                                +"<i class='fas fa-sign-out-alt fa-2x' style='color: #cccccc'></i>"
                        +"</button>"
                +"</nav>"	
		+"<div class='container-fluid'>"
			+"<h2>Request Time Off</h2>"
			+"<table class='table table-striped'>"
				+"<thead>"
					+"<tr>"
						+"<th>Start Date</th>"
						+"<th>End Date</th>"
						+"<th>Total Work Hours</th>"
					+"</tr>"
				+"</thead>"
				+"<tbody>"
					+"<tr>"
						+"<td><input type='text' id='datepicker-start' onchange='updateTotalWorkHours();'></td>"
						+"<td><input type='text' id='datepicker-end' onchange='updateTotalWorkHours();'></td>"
						+"<td><h2 id='total_work_hours'></h2></td>"
					+"</tr>"
				+"</tbody>"
			+"</table>"
			+"<button type='button' class='btn btn-primary'>Submit</button>"
		+"</div>"
	);
	$("#datepicker-start").datepicker({minDate: 0, beforeShowDay: $.datepicker.noWeekends});
	$("#datepicker-end").datepicker({minDate: 0, beforeShowDay: $.datepicker.noWeekends});
}

function updateTotalWorkHours() {
	let sDate = new Date( $("#datepicker-start").val() );
	let eDate = new Date( $("#datepicker-end").val() );

	console.log(sDate);
	console.log(eDate);
	if (sDate.toString() != "Invalid Date" && eDate.toString() != "Invalid Date") {
		let total_hours = ((eDate - sDate)/(1000*60*60*24)*8)+8;
		$("#total_work_hours").empty();
		$("#total_work_hours").append(total_hours);
	}
}
