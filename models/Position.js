const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const positionSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    cost: {
        type: Number,
        required: true
    },
    category_id: {
        ref: 'categories',
        type: Schema.Types.ObjectId,
    },
    user_id: {
        ref: 'users',
        type: Schema.Types.ObjectId,
    }
});

module.exports = mongoose.model('positions', positionSchema);