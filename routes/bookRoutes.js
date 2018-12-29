var express = require('express');

var route = (Book) => {
  var bookRouter = express.Router();

  bookRouter.route('/')
    .post((req, res) => {
      var book = new Book(req.body);

      book.save();

      res.status(201).send(book);
    })
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
    });

  bookRouter.route('/:bookId')
    .get((req, res) => {
      Book.findById(req.params.bookId, (err, book) => {
        if (err) {
          res.status(500).send(err);
        } else {
          res.json(book);
        }
      });
    })
    .put((req, res) => {
      Book.findById(req.params.bookId, (err, book) => {
        if (err) {
          res.status(500).send(err);
        } else {
          book.title = req.body.title;
          book.genre = req.body.genre;
          book.author = req.body.author;
          book.read = req.body.read;
          book.save();
          res.json(book);
        }
      });
    });

  return bookRouter;
};

module.exports = route;