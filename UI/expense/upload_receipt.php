<?php
session_start();

if ( 0 < $_FILES['file']['error'] ) {
	http_response_code(400);
	echo json_encode(array("Error"=>$_FILES['file']['error']));
} else {
	$name = "receipts/" . time() . ".jpg";
	move_uploaded_file($_FILES['file']['tmp_name'], $name);
	http_response_code(200);
	echo json_encode(array( "Filepath"=>$name));
}
?>
