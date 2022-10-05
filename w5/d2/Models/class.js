const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const classSchema = new Schema({
    id: {type: Number, required: true},
    name: {type: String, required: true},
    start_date: {type: String, required: true},
    end_date: {type: String, required: true}
});

module.exports = mongoose.model('Class', classSchema);