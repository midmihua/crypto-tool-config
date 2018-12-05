const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TargetPriceSchema = new Schema({
    name: { type: String, default: 'target_price', required: true },
    user: { type: String, required: true },
    params: {
        market: { type: String, required: true },
        symbol: { type: String, required: true },
        targetPrice: { type: Number, required: true },
        positionPrice: { type: Number, default: 0 },
        direction: { type: String, enum: ['>=', '<='], default: '>=', required: true },
        retry: { type: Number, default: 1, required: true }
    },
    sendTo: {
        token: String,
        chatId: String
    },
    status: { type: String, enum: ['A', 'D'], default: 'A', required: true },
    createDate: { type: Date, default: Date.now }
});

TargetPriceSchema.pre('save', next => {
    now = new Date();
    if (!this.createDate) {
        this.createDate = now;
    }
    next();
});

// Complex unique key example: TargetPriceSchema.index({ market: 1, rule: 1, symbol: 1 }, { unique: true });

const TargetPriceModel = mongoose.model(process.env.MONGO_RULE_TARGET_PRICE, TargetPriceSchema);

module.exports = TargetPriceModel;