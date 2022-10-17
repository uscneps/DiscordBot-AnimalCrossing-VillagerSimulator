const { model, Schema, Types } = require('mongoose');

module.exports = model('User', new Schema({
    id: { type: String, required: true },
    inventory: { type: Object, default: {} },
    bells: { type: Types.Decimal128, default: 100 }
}));