var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser');

var db = mongoose.connect('mongodb://localhost/bookAPI');

var Book = require('./models/bookModel');
var app = express();
var port = process.env.PORT || 3000;


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Hello World!...');
});

bookRouter = require('./routes/bookRoutes')(Book);


app.use('/api/books', bookRouter);
app.use('/api/authors', bookRouter);

app.listen(port, () => {
    console.log(`Gulp is running on PORT: ${port}`);
});