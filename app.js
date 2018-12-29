var express = require('express');

var app = express();

var port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Welcome to node API');
});

app.listen(port, () => {
    console.log(`Gulp is running on PORT: ${port}`);
});