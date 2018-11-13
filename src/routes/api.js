const express = require('express');
const router = express.Router();
const rules = require('../models/rules');

// Init binance api object
const api = require('binance');
const binanceRest = new api.BinanceRest({
    key: '',
    secret: ''
});

// RULE ACTIONS BLOCK >>

// Add new Rule
router.post('/rule/post', (req, res, next) => {
    rules.create(req.body).then((record) => {
        res.status(201).send(record);
    }).catch(next);
});

// Get existing Rules
router.get('/rule/get', (req, res, next) => {
    if (req.query.name !== undefined) {
        rules.findOne({ 'name': req.query.name }).then((records) => {
            if (records === null)
                return res.send({ result: 'Requested data was not found' });
            else
                res.status(200).send(records);
        }).catch(next);
    }
    else {
        rules.find().then((records) => {
            res.status(200).send(records);
        }).catch(next);
    }
});

// Update existing Rule (full update)
router.put('/rule/put/:id', (req, res, next) => {
    rules.findByIdAndUpdate({ _id: req.params.id }, req.body).then(() => {
        rules.findOne({ _id: req.params.id }).then((record) => {
            res.status(200).send(record);
        });
    }).catch(next);
});

// Remove existing Rule
router.delete('/rule/delete/:id', (req, res, next) => {
    rules.findByIdAndRemove({ _id: req.params.id }).then((record) => {
        res.send(record);
    }).catch(next);
});

// RULE ACTIONS BLOCK <<

// MARKETS ACTIONS BLOCK >>

// Get market avaliable crypto pairs
// market = [binance, kuna, ...]
router.get('/pairs/get', (req, res, next) => {
    if (req.query.market !== undefined) {

        // Use binance API to get data
        if (req.query.market === 'binance') {
            binanceRest.ticker24hr('', (err, data) => {
                if (err)
                    return err;
                res.send(data);
            });
        }
    }
    else {
        res.status(400).send({
            'msg': 'Provide correct market name in the request line (for example, market=binance)'
        });
    }
});

// MARKETS ACTIONS BLOCK <<

module.exports = router;