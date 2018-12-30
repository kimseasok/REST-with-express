var bookController = (Book) => {
    var post = (req, res) => {
        var book = new Book(req.body);

        book.save();

        res.status(201).send(book);
    };

    var get = (req, res) => {
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
      };

      return {
          post: post,
          get: get
      }
}

module.exports = bookController;
