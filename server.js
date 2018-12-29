const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;

var app = express();

// register hbs partials
hbs.registerPartials(__dirname + '/views/partials');
// Set view enigne to hbs
app.set('view engine', 'hbs');

app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('Unable to append to serer.log');
    }
  });
  next();
});
// Render page in middleware. The afterward codes won't be executed.
// app.use((req, res, next) => {
//   res.render('maintenance.hbs');
// });

// Register midellware: set folder for static resources
app.use(express.static(__dirname + '/public'));
// register hbs helpers
hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.get('/', (req, res) => {
  // Return html
  // res.send('<h1>Hello Express!</h1>');

  // Return json objects
  // res.send({
  //   name: 'Menghua',
  //   likes: [
  //     'movie', 'reading'
  //   ]
  // });
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMsg: 'Welcome to my website'
  })
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About page'
  })
});

app.get('/bad', (req, res) => {
  res.send({
    errorMsg: 'Internal error'
  });
});

app.listen(port, () => {
  console.log('Server is up on port ', port);
});
