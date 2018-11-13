const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Market = require('./markets');
const Rule = require('./rules');

const BaseSchema = new Schema({
    symbol: {
        type: String,
        required: true
    },
    market: {
        type: Schema.Types.ObjectId,
        ref: Market,
        require: true
    },
    rule: {
        type: Schema.Types.ObjectId,
        ref: Rule,
        required: true
    },
    params: [
        {
            param: {
                type: String,
                required: true
            },
            value: {
                type: String,
                required: true
            }
        }
    ],
    send: {
        token: String,
        chat_id: String
    },
    retry: {
        type: Number,
        default: 1
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active'
    },
    description: String,
    createDate:
    {
        type: Date,
        default: Date.now
    }
});

BaseSchema.index({ market: 1, rule: 1, symbol: 1 }, { unique: true });

const BaseModel = mongoose.model(process.env.MONGO_BASE_COLLECTION, BaseSchema);

module.exports = BaseModel;