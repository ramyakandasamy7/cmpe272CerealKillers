<?php
session_start();

if (isset($_POST)) {
	$host  = "18.208.107.185";
	$user  = "root";
	$pswd  = 'Cmpe272!';
	$db    = "employees"; 
	$email = $_POST['email'];
	$row;
	$con = new mysqli($host, $user, $pswd, $db);

	if ($con->connect_error) {
		die("Connection failed: " . $con->connect_error);
	}

	$query = "
		SELECT e.first_name,
		       e.last_name,
		       e.email,
		       e.emp_no,
		       de.dept_no,
		       d.dept_name
		FROM   employees e
		INNER JOIN dept_emp de
		ON     de.emp_no = e.emp_no
		INNER JOIN departments d
		ON     d.dept_no = de.dept_no
		WHERE  e.email = '$email'
	;";

	$emp_info = $con->query($query);

	if ($emp_info->num_rows > 0) {
		$row = $emp_info->fetch_assoc();
		$emp_no = $row['emp_no'];
		$query = "
			SELECT * FROM dept_manager WHERE emp_no = $emp_no
		;";
		$is_manager = $con->query($query);

		if ($is_manager->num_rows > 0) {
			$row['is_manager'] = "1";
		} else {
			$row['is_manager'] = "0";
		}
		echo json_encode($row);
	} else {
		echo json_encode("NO_EMPLOYEE");
		exit();
	}
	$con->close();
}
?>
