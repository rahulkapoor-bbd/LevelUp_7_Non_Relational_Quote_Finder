import express from 'express';
import path from 'path';
import passport from 'passport';
import passportGoogle from 'passport-google-oauth20';
import session from 'express-session';

const GoogleStrategy = passportGoogle.Strategy;

const app = express();
const PORT : number = 8080;

app.use(express.static(path.join(__dirname,'public')));

app.use(session({ secret: 'your_secret_key', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

const googleClientId: string = '366971779822-ovdje2ns171g3bcjac27i89morafkk55.apps.googleusercontent.com';
const googleClientSecret: string = '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';

// Passport configuration for Google OAuth
passport.use(
    new GoogleStrategy(
      {
        clientID: googleClientId,
        clientSecret: googleClientSecret,
        callbackURL: 'http://localhost:8080/auth/google/callback',
      },
      (accessToken, refreshToken, profile, done) => {
        // You can handle user authentication or database operations here
        return done(null, profile);
      }
    )
  );
  
  // Serialize and deserialize user
  passport.serializeUser((user, done) => {
    // Store user data in the session
    done(null, user);
  });
  
  passport.deserializeUser((obj: Express.User, done) => {
    // Retrieve user data from the session
    done(null, obj);
  });


app.get('/', (req,res)=>{
    res.sendFile(path.join(__dirname,'/public/landing.html'));
})

app.get('/home', (req,res)=>{
    res.sendFile(path.join(__dirname,'/public/home.html'));
})


app.get('/results', (req,res)=>{
    res.sendFile(path.join(__dirname,'/public/results.html'));
})

// Route for initiating Google OAuth
app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Callback route after Google OAuth authentication
app.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    // Redirect or handle successful login
    res.redirect('/home'); // Redirect to a profile page or a dashboard
  }
);


app.listen(PORT, ()=>{
    console.log(`Application is running on PORT ${PORT}`);
})