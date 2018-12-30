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

  bookRouter.use('/:bookId', (req, res, next) => {
    Book.findById(req.params.bookId, (err, book) => {
      if (err) {
        res.status(500).send(err);
      } else if (book) {
        req.book = book;
        res.json(book);
        next();
      } else {
        res.status(404).send('Not found');
      }
    });
  });
  bookRouter.route('/:bookId')
    .get((req, res) => {
      res.json(req.book);
    })
    .put((req, res) => {
      Book.findById(req.params.bookId, (err, book) => {
        if (err) {
          res.status(500).send(err);
        } else {
          req.book.title = req.body.title;
          req.book.genre = req.body.genre;
          req.book.author = req.body.author;
          req.book.read = req.body.read;
          req.book.save();
          res.json(book);
        }
      });
    })
    .patch();

  return bookRouter;
};

module.exports = route;