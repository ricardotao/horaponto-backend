const mongoose = require('../../app/database/connection');

const projectSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true,
        maxlength: 150,
    },
    DataCriacao: {
        type: Date,
        required: true,
        default: Date.now,
    }
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;