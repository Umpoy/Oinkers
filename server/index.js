const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

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