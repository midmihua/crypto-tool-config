const express = require('express');
const router = express.Router();
const rule = require('../models/rules');

// Add new Rule
router.post('/post', (req, res, next) => {
    rule.create(req.body).then((record) => {
        res.status(201).send(record);
    }).catch(next);
});

// Get existing rule
router.get('/get', (req, res, next) => {
    if (req.query.name !== undefined) {
        rule.findOne({ 'name': req.query.name }).then((records) => {
            if (records === null)
                return res.send({ result: 'Requested data was not found' });
            else
                res.status(200).send(records);
        }).catch(next);
    }
    else {
        rule.find().then((records) => {
            res.status(200).send(records);
        }).catch(next);
    }
});

// Update existing Rule (full update)
router.put('/put/:id', (req, res, next) => {
    rule.findByIdAndUpdate({ _id: req.params.id }, req.body).then(() => {
        rule.findOne({ _id: req.params.id }).then((record) => {
            res.status(200).send(record);
        });
    }).catch(next);
});

// Remove existing Rule
router.delete('/delete/:id', (req, res, next) => {
    rule.findByIdAndRemove({ _id: req.params.id }).then((record) => {
        res.send(record);
    }).catch(next);
});

module.exports = router;