const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RuleSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: String,
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'inactive'
    },
    createDate:
    {
        type: Date,
        default: Date.now
    }
});

const RuleModel = mongoose.model(process.env.MONGO_RULES_COLLECTION, RuleSchema);

module.exports = RuleModel;