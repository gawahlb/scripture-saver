var express = require('express');
var path = require('path');
var http = require('http');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');

var index = require('./server/routes/app');
const scripturesRoutes = require('./server/routes/scriptures');

(async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/scripture-saver', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Connected to database!');
  } catch (err) {
    console.log('Connection failed: ' + err);
  }
})();

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());

app.use(logger('dev'));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, PUT, DELETE, OPTIONS'
  );
  next();
});

app.use(express.static(path.join(__dirname, 'dist/scripture-saver/browser')));

app.use('/', index);
app.use('/scriptures', scripturesRoutes);

const port = process.env.PORT || '3000';
app.set('port', port);

const server = http.createServer(app);

server.listen(port, function() {
  console.log('API running on localhost: ' + port)
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/scripture-saver/browser/index.html'));
});

