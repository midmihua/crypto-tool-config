const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MarketSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    url: String,
    description: String,
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active'
    },
    createDate:
    {
        type: Date,
        default: Date.now
    }
});

const MarketModel = mongoose.model(process.env.MONGO_MARKET_COLLECTION, MarketSchema);

module.exports = MarketModel;