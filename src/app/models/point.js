const mongoose = require('../../app/database/connection');

const pointSchema = new mongoose.Schema({
    UserId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    DatePoint: {
        type: Date,
        required: true
    },
    DateHourPoint: {
        type: Date,
        required: true
    },
    Type: {
        type: String,
        enum: ["entrada", "almoco_inicio", "almoco_fim", "saida"],
        required: true
    }
});

const Point = mongoose.model('Point', pointSchema);

module.exports = Point;