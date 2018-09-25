const express = require('express');
const cors = require('cors')

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.json({
        message: 'hello world'
    });
});

function isValidOink(oink) {
    return oink.name && oink.name.toString().trim() !== '' &&
        oink.content && oink.content.toString().trim() !== '';
}

app.post('/oinks', (req, res) => {
    if (isValidOink(req.body)) {
        //insert into db
        const oink = {
            name: req.body.name.toString(),
            content: req.body.content.toString()
        }
        console.log(oink);
    } else {
        res.status(422);
        res.json({
            message: "Warning! Name and Content are required!"
        })
    }
})

app.listen(3000, () => {
    console.log('Listening on http://localhost:3000');
})