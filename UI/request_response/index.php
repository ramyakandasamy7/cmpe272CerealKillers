<?php
session_start();
$ans = "";
$id  = "";
if (isset($_GET)) {
	$ans = $_GET["ans"];
	$id  = $_GET["id"];
	$email  = $_GET["email"];
}
$cmd = "curl ifconfig.me";
$out = exec($cmd, $output, $ec);
?>
<html>
	<head>
		<title>Dashboard</title>
		<link rel="shortcut icon" href=/imgs"/favicon.ico" type="image/x-icon">
		<link rel="icon" href="/imgs/favicon.ico" type="image/x-icon">
		<link href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
		<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
		<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.bundle.min.js" integrity="sha384-xrRywqdh3PHs8keKZN+8zzc5TX0GRTLCcmivcbNJWm2rs5C8PRhcEn3czEjhAO9o" crossorigin="anonymous"></script>
		<link href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossorigin="anonymous">
		<script src="https://kit.fontawesome.com/a215ff507f.js" crossorigin="anonymous"></script>

		<script src="https://cdn.jsdelivr.net/npm/js-cookie@beta/dist/js.cookie.min.js"></script>

		<script type='text/javascript'>
		var pubip = '<?php echo "$out";?>';
		$(document).ready(function() {
			var ans = '<?php echo "$ans";?>';
			var id  = <?php echo "$id";?>;
			var email = '<?php echo "$email";?>';
			if (ans === 'y') {
				approve(id, email);
			} else {
				decline(id, email);
			}
		});
		function approve(timeoffId, email) {
		        $.ajax({
		                url: "http://"+pubip+":4000/timeoffstatus",
		                type: "POST",
		                data: {status:"Approved",requestid:timeoffId,emailAddress:email},
		                dataType: "json"
		        }).done(function(data, message, stat) {
		                if (stat.status === 200) {
					countdownAndRedirect("Time off request accepted...");
		                }
		        });
		}
		
		function decline(timeoffId, email) {
		        $.ajax({
		                url: "http://"+pubip+":4000/timeoffstatus",
		                type: "POST",
		                data: {status:"Declined",requestid:timeoffId,emailAddress: email},
		                dataType: "json"
		        }).done(function(data, message, stat) {
		                if (stat.status === 200) {
					countdownAndRedirect("Time off request declined...");
		                }
			});
  		}

		function countdownAndRedirect(message) {
			var count = 5;
			$('#for_message').append(message);	
			$('#for_counter').append("Redirecting in <span id='counter'>"+count.toString()+"</span> seconds...");	
			setInterval(function() {
				$('#counter').text(count);
				count--;
				if (count < 0) {
					window.location.replace('http://hr.mymsseprojects.com');
				}
			},1000);
		}
		</script>
	</head>
	<body>
		<div id='root' class='container-fluid'>
			<div class='jumbotron jumbotron-fluid'>
				<div class='container'>
					<h1 class='display-4' id='for_message'></h1>
					<p class='lead' id='for_counter'></p>
				</div>
			</div>
		</div>
	</body>
</html>
