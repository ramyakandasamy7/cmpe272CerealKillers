
function initUI() {
	renderModals();

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
				+"<li class='breadcrumb-item active'>Expenses</li>"
			+"</ol>"
                        +"<button type='button' class=' btn pull-right' title='Logout' onclick='logout();'>"
                                +"<i class='fas fa-sign-out-alt fa-2x' style='color: #cccccc'></i>"
                        +"</button>"
                +"</nav>"	
		+"<div class='container-fluid'>"
			+"<h2>Expenses History</h2>"
			+"<button type='button' class='btn btn-primary btn-sm' style='margin-bottom: 10px;' data-toggle='modal' data-target='#expense_input'>File An Expense</button>"
			+"<table class='table table-striped'>"
				+"<thead>"
					+"<tr>"
						+"<th>Date</th>"
						+"<th>Amount</th>"
						+"<th>Status</th>"
					+"</tr>"
				+"</thead>"

			+"</table>"
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
						+"<button type='button' class='btn btn-primary btn-sm'>Submit</button>"
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
