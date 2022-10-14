const { model, Schema } = require('mongoose');

module.exports = model('User', new Schema({
    id: { type: String, required: true },
    inventory: { type: Object, default: {} },
}));