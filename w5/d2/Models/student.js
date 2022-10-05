const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const studentSchema = new Schema({
    id:{ type: Number, required: true },
    name:{ type: String, required: true },
    email:{ type: String, required: true },
    phone:{ type: String, required: true },
    github:{ type: String, required: true },
    start_date:{ type: String, required: true },
    end_date:{ type: String, required: true },
    class_id:{ type: Number, required: true }
});

module.exports = mongoose.model('Student', studentSchema);