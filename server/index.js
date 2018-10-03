const express = require('express');
const cors = require('cors');
const monk = require('monk');
const Filter = require('bad-words');
const rateLimit = require('express-rate-limit');

const app = express();

const db = monk('localhost/oinkers');
const oinks = db.get('oinks');
const filter = new Filter();

app.use(cors());
app.use(express.json());

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

app.use(rateLimit({
    windowMs: 30 * 1000, //can only submit every 30 seconds
    max: 1
}));

app.post('/oinks', (req, res) => {
    if (isValidOink(req.body)) {
        //insert into db
        const oink = {
            name: filter.clean(req.body.name.toString()),
            content: filter.clean(req.body.content.toString()),
            created: new Date()
        };

        oinks.insert(oink).then(createdOink => {
            res.json(createdOink);
        });
        console.log('oink sent to db');
    } else {
        res.status(422);
        res.json({
            message: "Warning! Name and Content are required!"
        })
    }
});

app.post('/delete', (req, res) => {
    oinks.remove({ _id: req.body.id }).then(deletedOink => {
        res.json(deletedOink);
    });
    console.log("oink removed from db");
});

app.listen(3000, () => {
    console.log('Listening on http://localhost:3000');
})