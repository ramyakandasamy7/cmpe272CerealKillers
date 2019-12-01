<?php
session_start();

?>
<html>
	<head>
		<title>Payroll</title>
		<link href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
		<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
		<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.bundle.min.js" integrity="sha384-xrRywqdh3PHs8keKZN+8zzc5TX0GRTLCcmivcbNJWm2rs5C8PRhcEn3czEjhAO9o" crossorigin="anonymous"></script>
		<link href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossorigin="anonymous">
		<script src="https://kit.fontawesome.com/a215ff507f.js" crossorigin="anonymous"></script>

		<script src="https://global.oktacdn.com/okta-signin-widget/3.2.0/js/okta-sign-in.min.js" type="text/javascript"></script>

		<link href="https://global.oktacdn.com/okta-signin-widget/3.2.0/css/okta-sign-in.min.css" type="text/css" rel="stylesheet"/>

		<link href="https://cdn.datatables.net/1.10.20/css/jquery.dataTables.min.css?t=<?php echo time();?>" type='text/css' rel='stylesheet'>
		<script src="https://cdn.datatables.net/1.10.20/js/jquery.dataTables.min.js"></script>

		<link href="/css/index.css?t=<?php echo time();?>" rel="stylesheet">
		<link href="css/payroll.css?t=<?php echo time();?>" rel="stylesheet">
		<script src='/js/okta.js?t=<?php echo time();?>'></script>
		<script src='js/payroll.js?t=<?php echo time();?>'></script>
		<script type='text/javascript'>
			$(document).ready(function() {
				initUI();
			});
		</script>
	</head>
	<body>
		<div id='root'></div>
		<div id='okta-login-container'></div>
	</body>
</html>
