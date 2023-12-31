const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    priority: {
        type: String,
        required: true,
        enum: ["High", "Low", "Intermediate"],
        default: "Intermediate"
    },
    status: {
        type: String,
        required: true,
        enum: ["Done", "Pending", "Doing"],
        default: "Pending"
    },
    dueDate: {
        type: String,
        required: true
    }
});

const todoModel = mongoose.model('todo', todoSchema);

module.exports = todoModel;
