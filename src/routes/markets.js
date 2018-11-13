const express = require('express');
const router = express.Router();
const market = require('../models/markets');

// Add new market
router.post('/post', (req, res, next) => {
    market.create(req.body).then((record) => {
        res.status(201).send(record);
    }).catch(next);
});

// Get existing market
router.get('/get', (req, res, next) => {
    if (req.query.name !== undefined) {
        market.findOne({ 'name': req.query.name }).then((records) => {
            if (records === null)
                return res.send({ result: 'Requested data was not found' });
            else
                res.status(200).send(records);
        }).catch(next);
    }
    else {
        market.find().then((records) => {
            res.status(200).send(records);
        }).catch(next);
    }
});

// Update existing market (full update)
router.put('/put/:id', (req, res, next) => {
    market.findByIdAndUpdate({ _id: req.params.id }, req.body).then(() => {
        market.findOne({ _id: req.params.id }).then((record) => {
            res.status(200).send(record);
        });
    }).catch(next);
});

// Remove existing market
router.delete('/delete/:id', (req, res, next) => {
    market.findByIdAndRemove({ _id: req.params.id }).then((record) => {
        res.send(record);
    }).catch(next);
});

module.exports = router;