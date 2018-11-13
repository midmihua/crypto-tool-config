const express = require('express');
const router = express.Router();
const base = require('../models/symbol');

// Add new base position
router.post('/post', (req, res, next) => {
    base.create(req.body).then((record) => {
        res.status(201).send(record);
    }).catch(next);
});

// Get existing base position
router.get('/get', (req, res, next) => {
    if (req.query.symbol !== undefined) {
        base.findOne({ 'symbol': req.query.symbol }).then((records) => {
            if (records === null)
                return res.send({ result: 'Requested data was not found' });
            else
                res.status(200).send(records);
        }).catch(next);
    } else if (req.query.market !== undefined) {
        base.findOne({ 'market': req.query.market }).then((records) => {
            if (records === null)
                return res.send({ result: 'Requested data was not found' });
            else
                res.status(200).send(records);
        }).catch(next);
    } else if (req.query.rule !== undefined) {
        base.findOne({ 'rule': req.query.rule }).then((records) => {
            if (records === null)
                return res.send({ result: 'Requested data was not found' });
            else
                res.status(200).send(records);
        }).catch(next);
    }
    else {
        base.find().then((records) => {
            res.status(200).send(records);
        }).catch(next);
    }
});

// Update existing base position (full update)
router.put('/put/:id', (req, res, next) => {
    base.findByIdAndUpdate({ _id: req.params.id }, req.body).then(() => {
        base.findOne({ _id: req.params.id }).then((record) => {
            res.status(200).send(record);
        });
    }).catch(next);
});

// Remove existing base position
router.delete('/delete/:id', (req, res, next) => {
    base.findByIdAndRemove({ _id: req.params.id }).then((record) => {
        res.send(record);
    }).catch(next);
});

module.exports = router;