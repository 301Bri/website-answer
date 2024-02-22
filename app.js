const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');

const app = express();
const port = 3000;

// Set up storage for multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'files/'); // specify the directory where files will be stored
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public')); // serve static files like CSS
app.set('view engine', 'ejs'); // use EJS for rendering HTML templates

// Serve login page
app.get('/', (req, res) => {
  res.render('login');
});

// Handle login form submission
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Replace with your authentication logic
  if (username === 'user' && password === 'password') {
    res.redirect('/files');
  } else {
    res.send('Invalid username or password. Please try again.');
  }
});

// Serve file upload page
app.get('/files', (req, res) => {
  res.render('upload');
});

// Handle file upload
app.post('/upload', upload.single('file'), (req, res) => {
  res.json({ success: true, message: 'File uploaded successfully!' });
});


});
