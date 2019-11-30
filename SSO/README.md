# okta-express-login-portal

A simple Node.js website that showcases how to handle user login and
registration.

If you'd like to play around with this application live, you can do so here:
[https://okta-express-login-portal.herokuapp.com](https://okta-express-login-portal.herokuapp.com).

![Homepage](https://raw.githubusercontent.com/rdegges/okta-express-login-portal/master/assets/homepage.png)


## Purpose

This is a simple Express.js website that supports user registration, user login,
and user management using [Okta](https://developer.okta.com). Okta makes
handling user authentication really simple, and I wanted to build something to
showcase how you can quickly spin up a Node.js website with very little effort
and have all the user management taken care of.

Why am I using Okta? Because it makes the authentication component really simple, and
that's what I'm all about: *simple stuff*.


## Prerequisites

If you don't already have an Okta account, please go create one:
[https://developer.okta.com/signup/](https://developer.okta.com/signup/).

Okta accounts are free and last forever, you can use them to store the users for
all of your applications, it's pretty nifty.

Now go clone this GitHub repository locally and change into the directory:

```bash
git clone https://github.com/rdegges/okta-express-login-portal.git
cd okta-express-login-portal
```

Next, you'll need to go create an Okta application. You can do this by logging
into the Okta dashboard, clicking the **Applications** tab, clicking **Add
Application**, clicking **Web** and **Next**, then entering the following
application settings:

- **Name**: `myproject` or whatever you want to name your project
- **Base URIs**: `http://localhost:3000`
- **Login redirect URIs**: `http://localhost:3000/users/callback`

Leave all the other settings as their default values, then click **Done**. On
the following page, copy down the values for both **Client ID** and **Client
secret**, you will need these in a moment.

Next, click the **Dashboard** tab at the top of the page, then copy the **Org
URL** value from the top-right of the page.

Then click the **API** tab at the top of the page as well as the **Create
Token** button. Enter a name for your token (just give it the same name as your
project) then click **Create Token**. Copy the token value down as you will need
it in a moment.

Next, at the very top of your page you'll see a little dropdown titled
**< > Developer Console**. Hover over this menu and click the **Classic UI**
button. Next, hover over the **Directory** tab and select the **Self-Service
Registration** menu option.

On this new page, enable Self-Service Registration and leave all the default
options selected except one: **Default redirect**. For the **Default redirect**
option select the **Custom URL** radio button and fill in
`http://localhost:3000/dashboard` as the value then click **Save**. This will
correctly enable users to register for accounts automatically using Okta.

Now go back to the menu option at the top of the page and re-select the **< >
Developer Console** option from the drop-down menu.

Finally, create a file that holds environment variables. This application relies
on environment variables to specify credentials so that you don't need to
hard-code secrets into your application.

Create a file named `.envrc` and enter the following contents (**NOTE**: this
will only work if you are using *nix or Mac -- if you're using Windows you'll
need to figure out what to do as I'm not a Windows guy, sorry!):

```
export OKTA_ORG_URL={{ your org URL }}
export OKTA_TOKEN={{ your okta token }}
export OKTA_CLIENT_ID={{ your client ID }}
export OKTA_CLIENT_SECRET={{ your client secret }}
export SECRET={{ a long random string you create by mashing the keybaord for a second }}
```

These settings will be used to kickstart your application.

To "activate" these settings, you need to tell your terminal to "apply" these
variables so they can be used. To do this run the following command:

```bash
. .envrc
```

You can test to amke sure your environemnt variables are working by running the
following command. If successful, you should see the value you previously
entered into the `.envrc` file.:

```bash
echo $OKTA_ORG_URL
```

Now you've got your app fully configured and the only thing you need to do is
install all of the project's dependencies. To do this, you must have Node.js
installed. If you don't, go view [this page](https://nodejs.org/en/download/package-manager/<Paste>) to learn how.

Once Node.js is isntalled (please install the latest release!), run the following
command to install all dependencies:

```bash
npm install
```


## Start the App

Now that everything is ready, you can start up the app. To do this, run the
following command -- this will start the webserver on port 3000:

```bash
npm start
```

Now open your browser and go visit `http://localhost:3000` to view the website.
If you click the **Log In / Register** button at the top of the page, you will be able to
log into the site using your Okta account you created earlier.

**NOTE**: You might want to test this out in a fresh incognito window as you're
likely already logged into your Okta account right now.

![Okta Login Page](https://raw.githubusercontent.com/rdegges/okta-express-login-portal/master/assets/login-page.png)

Once you're logged in you'll see a dashboard page and can logout or movea round
the site.

![Using the site](https://raw.githubusercontent.com/rdegges/okta-express-login-portal/master/assets/using-the-site.gif)


## Next Steps

Now that you've gotten your Express.js website running with user management, why
not build something awesome?

Go checkout [Express.js' website](https://expressjs.com/) to learn more about
Express.js, check out the [Okta Developer
blog](https://developer.okta.com/blog/) to learn more about managing user
authentication, and follow [@oktadev](https://twitter.com/oktadev) on Twitter to
stay up-to-date with security best practices.
