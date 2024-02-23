// index.js
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: 'your-secret-key', resave: true, saveUninitialized: true }));

app.set('view engine', 'ejs');
app.use(express.static('public'));
// Sample user credentials (replace with your authentication logic)
const validUser = {
  username: 'user',
  password: 'password',
};

app.get('/', (req, res) => {
  res.render('index', { message: '' });
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (username === validUser.username && password === validUser.password) {
    req.session.user = username;
    res.redirect('/dashboard');
  } else {
    res.render('index', { message: 'Invalid username or password' });
  }
});

app.get('/dashboard', (req, res) => {
  if (req.session.user) {
    res.render('dashboard', { username: req.session.user });
  } else {
    res.redirect('/');
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log('Server is running on port 3000');
});
