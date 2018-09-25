const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.json({
        message: 'hello world'
    });
});

app.post('/oinks', (req, res) => {
    console.log(req.body);
})

app.listen(3000, () => {
    console.log('Listening on http://localhost:3000');
})