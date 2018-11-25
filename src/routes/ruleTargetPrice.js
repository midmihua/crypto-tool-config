const express = require('express');
const router = express.Router();
const rule = require('../models/ruleTargetPrice');

// Add new TargetPrice rule record
router.post('/post', (req, res, next) => {
    rule.create(req.body).then((record) => {
        res.status(201).send(record);
    }).catch(next);
});

// Get all TargetPrice rule records
router.get('/get', (req, res, next) => {
    if (req.query.user !== undefined) {
        rule.findOne({ 'user': req.query.user }).then((records) => {
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

// Update specific TargetPrice rule record
router.put('/put/:id', (req, res, next) => {
    rule.findByIdAndUpdate({ _id: req.params.id }, req.body).then(() => {
        rule.findOne({ _id: req.params.id }).then((record) => {
            res.status(200).send(record);
        });
    }).catch(next);
});

// Remove specific TargetPrice rule record
router.delete('/delete/:id', (req, res, next) => {
    rule.findByIdAndRemove({ _id: req.params.id }).then((record) => {
        res.send(record);
    }).catch(next);
});

module.exports = router;