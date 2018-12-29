var express = require('express'),
    mongoose = require('mongoose');

var db = mongoose.connect('mongodb://localhost/bookAPI');

var Book = require('./models/bookModel');
var app = express();
var port = process.env.PORT || 3000;

var bookRouter = express.Router();

bookRouter.route('/books')
    .get((req, res) => {
        var query = {};

        if (req.query.genre) {
            query.genre = req.query.genre;
        }

        Book.find(query, (err, books) => {
            if (err) {
                res.status(500).send(err);
            } else {
                res.json(books);
            }
        });
    })
    .post()

app.use('/api', bookRouter);

app.listen(port, () => {
    console.log(`Gulp is running on PORT: ${port}`);
});