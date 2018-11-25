const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TargetPriceSchema = new Schema({
    info: { type: String, default: 'target_price rule' },
    user: { type: String, require: true },
    params: {
        market: { type: String, require: true },
        symbol: { type: String, require: true },
        targetPrice: { type: Number, require: true },
        direction: { type: String, enum: ['>=', '<='], default: '>=', require: true },
        retry: { type: Number, default: 1, require: true }
    },
    sendTo: {
        token: String,
        chatId: String
    },
    status: { type: String, enum: ['A', 'D'], default: 'A', require: true },
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