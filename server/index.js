const express = require('express');
const cors = require('cors');
const monk = require('monk');

const app = express();

const db = monk('localhost/oinkers');
const oinks = db.get('oinks');

app.use(cors());
app.use(express.json());

// oinks.remove();

app.get('/', (req, res) => {
    res.json({
        message: 'hello world'
    });
});

app.get('/oinks', (req, res) => {
    oinks.find().then(oinks => {
        res.json(oinks);
    });
})

function isValidOink(oink) {
    return oink.name && oink.name.toString().trim() !== '' &&
        oink.content && oink.content.toString().trim() !== '';
}

app.post('/oinks', (req, res) => {
    if (isValidOink(req.body)) {
        //insert into db
        const oink = {
            name: req.body.name.toString(),
            content: req.body.content.toString(),
            created: new Date()
        };

        oinks.insert(oink).then(createdOink => {
            res.json(createdOink);
        });
    } else {
        res.status(422);
        res.json({
            message: "Warning! Name and Content are required!"
        })
    }
});

app.get('/oinks', (req, res) => {

})

app.listen(3000, () => {
    console.log('Listening on http://localhost:3000');
})