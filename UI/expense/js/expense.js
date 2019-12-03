
var pubip;

function initUI(pubip) {
	window.pubip = pubip;
	renderModals();

	let hasTokens = checkForTokens(window.oktaSignIn);
        if (hasTokens === true) {
		getEmployeeInfo();
                renderContainers();
		getExpenseData();
        } else {
                location.replace('http://hr.mymsseprojects.com');
        }
}

function approve(exId) {
	$.ajax({
		url: 'http://'+window.pubip+':5000/expenses/'+exId.toString(),
		type: 'PUT',
		data: {status:"Approved"},
		dataType: 'json'
	}).done(function(data, message, stat) {
		if (stat.status === 200) {
			location.reload();
		}
	});
}

function decline(exId) {
	$.ajax({
		url: 'http://'+window.pubip+':5000/expenses/'+exId.toString(),
		type: 'PUT',
		data: {status:"Declined"},
		dataType: 'json'
	}).done(function(data, message, stat) {
		if (stat.status === 200) {
			location.reload();
		}
	});
}

function showImage(fpath) {
	let fullpath = "/expense/"+fpath;

	$('#receipt_modal_body').empty();
	$('#receipt_modal_body').append("<img src='"+fullpath+"'/>");
}

function getExpenseData() {
	let einfo = window.employee_info;

	if (einfo.is_manager == "1") {
		$('#expense_title').append("Expenses for "+einfo.dept_name+" Department ("+einfo.dept_no+")");
		$('#file_expense').hide();
		$('#table_container').append(
			"<table class='table table-striped' id='expense_table'>"
				+"<thead>"
					+"<tr>"
						+"<th>Employee ID</th>"
						+"<th>Employee Name</th>"
						+"<th>Date</th>"
						+"<th>Amount</th>"
						+"<th>Receipt</th>"
						+"<th>Status</th>"
					+"</tr>"
				+"</thead>"

			+"</table>"
		);
		$.ajax({
			url: 'http://'+window.pubip+':5000/deptexpenses/'+einfo.dept_no,
			type: 'GET',
			dataType: 'json'
		}).done(function(data, message, stat) {
			if (stat.status === 200) {
				console.log(data);
				
				for (i in data) {
					data[i].name   = data[i].first_name+" "+data[i].last_name;
					data[i].status = (data[i].status === 'Pending') ? "<button type='button' class='btn btn-primary btn-sm' style='margin-right:10px;' onclick='approve("+data[i].id+")'>Approve</button><button type='button' class='btn btn-danger btn-sm' onclick='decline("+data[i].id+")'>Decline</button>": data[i].status;
					data[i].file_path = "<button type='button' class='btn' data-toggle='modal' data-target='#receipt_modal' onclick='showImage(\""+data[i].file_path+"\");'><i class='fas fa-receipt fa-2x'></i></button>";
				}
				$("#expense_table").DataTable({
                                        "pageLength": 10,
                                        "data": data,
                                        "columns": [
                                                { "data": "employee_id" },
                                                { "data": "name"        },
                                                { "data": "create_date" },
                                                { "data": "amount"      },
                                                { "data": "file_path"   },
                                                { "data": "status"      }
                                        ]
                                });
			} else {
				alert("Error: "+stat.responseText);
			}
		});
	} else {
		$('#expense_title').append("Expenses for "+einfo.first_name+" "+einfo.last_name+" ("+einfo.emp_no+")");
		$('#table_container').append(
			"<table class='table table-striped' id='expense_table'>"
				+"<thead>"
					+"<tr>"
						+"<th>Date</th>"
						+"<th>Amount</th>"
						+"<th>Receipt</th>"
						+"<th>Status</th>"
					+"</tr>"
				+"</thead>"

			+"</table>"
		);
		$.ajax({
			url: 'http://'+window.pubip+':5000/empexpenses/'+einfo.emp_no,
			type: 'GET',
			dataType: 'json'
		}).done(function(data, message, stat) {
			if (stat.status === 200) {
				console.log(data);
				for (i in data) {
					data[i].amount = "$"+data[i].amount.toString();
					data[i].file_path = "<button type='button' class='btn' data-toggle='modal' data-target='#image_modal' onclick='showImage(\""+data[i].file_path+"\");'><i class='fas fa-receipt fa-2x'></i></button>";
				}
				$("#expense_table").DataTable({
                                        "pageLength": 10,
                                        "data": data,
                                        "columns": [
                                                { "data": "create_date" },
                                                { "data": "amount"      },
                                                { "data": "file_path"   },
                                                { "data": "status"      }
                                        ]
                                });
			} else {
				alert("Error: "+stat.responseText);
			}
		});
	}
}

function submitExpense() {
	let amount = $('#amount').val();
	var fd = $('#expense_file').prop('files')[0];
	var form_data = new FormData();
	form_data.append('file',fd);
	$.ajax({
		url: "upload_receipt.php",
		dataType: 'text',
		cache: false,
		contentType: false,
		processData: false,
		data: form_data,
		type: 'POST'
	}).done(function(data, message, stat) {
		if (stat.status === 200) {
			let fpath = JSON.parse(data).Filepath; 
			insertToDB(fpath, amount);
		}
	});
}

function insertToDB(fpath, amount) {
	let einfo = window.employee_info;

	$.ajax({
		url: 'http://'+window.pubip+':5000/expenses',
		type: 'POST',
		data: { employee_id: einfo.emp_no, amount: amount, file_path: fpath},
		dataType: "json"
	}).done(function(data, message, stat) {
		if (stat.status === 200) {
			alert("Expense filing success!");
			location.reload();
		} else {
			alert("Error: "+stat.responseText);
		}
	});
}

function renderContainers() {
	$('#root').append(
                "<nav aria-label='breadcrumb' class='navbar navbar-light bg-dark'>"
			+"<ol class='breadcrumb' style='margin-top: 10px;'>"
                        	+"<li class='breadcrumb-item'><a href='http://hr.mymsseprojects.com'>Zen HR</a></li>"
				+"<li class='breadcrumb-item active'>Expenses</li>"
			+"</ol>"
                        +"<button type='button' class=' btn pull-right' title='Logout' onclick='logout();'>"
                                +"<i class='fas fa-sign-out-alt fa-2x' style='color: #cccccc'></i>"
                        +"</button>"
                +"</nav>"	
		+"<div class='container-fluid' id='table_container'>"
			+"<h2 id='expense_title'></h2>"
			+"<button type='button' id='file_expense' class='btn btn-primary btn-sm' style='margin-bottom: 10px;' data-toggle='modal' data-target='#expense_input'>File An Expense</button>"
		+"</div>"
	);
}

function renderModals() {
	$("#root").append(
		"<div class='modal fade' tabindex='-1' role='dialog' id='expense_input' aria-labelled='expenseInputLabel' aria-hidden='true'>"
			+"<div class='modal-dialog' role='document'>"
				+"<div class='modal-content'>"
					+"<div class='modal-header'>"
						+"<h5 class='modal-title' id='expenseInputLabel'>File an expense</h5>"
						+"<button type='button' class='close' data-dismiss='modal' aria-label='Close'>"
							+"<span aria-hidden='true'>&times</span>"
						+"</button>"
					+"</div>"
					+"<div class='modal-body'>"
						+"<form id='expense_force'>"
							+"<div class='form-group'>"
								+"<label for='amount'>Amount [USD]</label>"
								+"<input type='text' class='form-control' id='amount'>"
							+"</div>"
							+"<div class='input-group'>"
								+"<div class='custom-file'>"
									+"<input type='file' class='custom-file-input' id='expense_file'>"
									+"<label class='custom-file-label' for='expense_file'>Choose file</label>"
								+"</div>"
							+"</div>"
						+"</form>"
					+"</div>"
					+"<div class='modal-footer'>"
						+"<button type='button' class='btn btn-danger btn-sm' data-dismiss='modal'>Cancel</button>"
						+"<button type='button' class='btn btn-primary btn-sm' onclick='submitExpense();'>Submit</button>"
					+"</div>"
				+"</div>"
			+"</div>"
		+"</div>"
		+"<div class='modal fade' tabindex='-1' role='dialog' id='receipt_modal' aria-labelled='expenseInputLabel' aria-hidden='true'>"
			+"<div class='modal-dialog modal-lg' role='document'>"
				+"<div class='modal-content'>"
					+"<div class='modal-header'>"
						+"<h5 class='modal-title'>Receipt</h5>"
						+"<button type='button' class='close' data-dismiss='modal' aria-label='Close'>"
							+"<span aria-hidden='true'>&times</span>"
						+"</button>"
					+"</div>"
					+"<div class='modal-body text-center' id='receipt_modal_body'>"
					+"</div>"
				+"</div>"
			+"</div>"
		+"</div>"
	);
	updateFileInput();
}

function updateFileInput() {
        $('#expense_file').on('change',function(){
                var fileName = $(this).val();
                $(this).next('.custom-file-label').html(fileName);
        });
}
