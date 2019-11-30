<?php
session_start();

?>
<html>
	<head>
		<title>Dashboard</title>
		<link href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
		<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
		<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.bundle.min.js" integrity="sha384-xrRywqdh3PHs8keKZN+8zzc5TX0GRTLCcmivcbNJWm2rs5C8PRhcEn3czEjhAO9o" crossorigin="anonymous"></script>
		<link href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossorigin="anonymous">
		<script src="https://kit.fontawesome.com/a215ff507f.js" crossorigin="anonymous"></script>

		<script src="https://global.oktacdn.com/okta-signin-widget/3.2.0/js/okta-sign-in.min.js" type="text/javascript"></script>

		<link href="https://global.oktacdn.com/okta-signin-widget/3.2.0/css/okta-sign-in.min.css" type="text/css" rel="stylesheet"/>

		<link href="css/index.css?t=<?php echo time();?>" rel="stylesheet">
		<script src='js/index.js?t=<?php echo time();?>'></script>
		<script type='text/javascript'>
			$(document).ready(function() {
				initUI();
			});
		</script>
	</head>
	<body>
		<div id='root'></div>
		<div id='okta-login-container'></div>
		<script type="text/javascript">
		//var oktaSignIn = new OktaSignIn({
		//  baseUrl: "https://dev-880333.okta.com",
		//  clientId: "0oa1x2i9ib9RY8NTc357",
		//  authParams: {
		//    issuer: "https://dev-880333.okta.com/oauth2/default",
		//    responseType: ['token', 'id_token'],
		//    display: 'page'
		//  }
		//});
		//console.log(oktaSignIn);
		//if (oktaSignIn.hasTokensInUrl()) {
		//  oktaSignIn.authClient.token.parseFromUrl(
		//    function success(tokens) {
		//      // Save the tokens for later use, e.g. if the page gets refreshed:
		//      // Add the token to tokenManager to automatically renew the token when needed
		//      console.log(tokens);
		//      tokens.forEach(token => {
		//        if (token.idToken) {
		//
		//          signIn.tokenManager.add('idToken', token);
		//        }
		//        if (token.accessToken) {
		//          signIn.tokenManager.add('accessToken', token);
		//        }
		//      });
		//
		//      // Say hello to the person who just signed in:
		//      var idToken = signIn.tokenManager.get('idToken');
		//      console.log('Hello, ' + idToken.claims.email);
		//
		//      // Remove the tokens from the window location hash
		//      window.location.hash='';
		//    },
		//    function error(err) {
		//      // handle errors as needed
		//      console.error(err);
		//    }
		//  );
		//} else {
		//  console.log("NO TOKENS");
		//  oktaSignIn.authClient.session.get().then(function(session) {
		//  	console.log(session);
		//  }).catch(function(err) {
		//  	console.log(err);
		//  });
		  //oktaSignIn.authClient.session.get(function (res) {
		  //  // Session exists, show logged in state.
		  //  console.log(res);
		  //  if (res.status === 'ACTIVE') {
		  //    console.log('Welcome back, ' + res.login);
		  //    return;
		  //  }
		  //  // No session, show the login form
		  //  oktaSignIn.renderEl(
		  //    { el: '#okta-login-container' },
		  //    function success(res) {
		  //      // Nothing to do in this case, the widget will automatically redirect
		  //      // the user to Okta for authentication, then back to this page if successful
		  //    },
		  //    function error(err) {
		  //      // handle errors as needed
		  //      console.error(err);
		  //    }
		  //  );
		  //});
		</script>
	</body>
</html>
