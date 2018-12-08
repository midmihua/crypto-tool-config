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
    if (JSON.stringify(req.query) === '{}') {
        rule.find().then((records) => {
            if (records === null || records === undefined)
                res.send({ result: 'Requested data was not found' });
            else
                res.status(200).send(records);
        }).catch(next);
    }
    else {
        rule.find(dynamicQuery(req.query)).then((records) => {
            if (records === null || records === undefined || records.length == 0)
                res.send({ result: 'Requested data was not found' });
            else
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
router.delete('/delete', (req, res, next) => {
    if (JSON.stringify(req.query) === '{}') {
        res.send({ result: 'Provide params to filter the data to be removed' });
    }
    else {
        rule.remove(dynamicQuery(req.query)).then((record) => {
            res.send(record);
        }).catch(next);
    }
});

function dynamicQuery(data) {
    let query = {};
    Object.keys(data).forEach(function (key) {
        if (key.toLocaleLowerCase() === 'user')
            query['user'] = data[key];
        else if (key.toLocaleLowerCase() === 'id')
            query['_id'] = { $in: data[key] };
        else if (key.toLocaleLowerCase() === 'status')
            query['status'] = data[key];
        else if (key.toLocaleLowerCase() === 'pair')
            query['params.symbol'] = { $in: data[key] };
        else if (key.toLocaleLowerCase() === 'retry')
            query['params.retry'] = data[key];
        else if (key.toLocaleLowerCase() === 'description')
            query['params.description'] = { $regex: '.*' + data[key] + '.*' };
    });
    return query;
}

module.exports = router;