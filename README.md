userProfileURL:"https://www.googleapis.com/oauth2/v3/userinfo", 

 

due to Google+’s deprecation, we need to ensure the app doesn’t access their Google+ account but their general info

/auth/google/secrets is the URI where Google will send the user after it’s authenticated them on their server.