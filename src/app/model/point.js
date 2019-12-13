const mongoose = require('../../database/conexao/mongodb');

const pointSchema = new mongoose.Schema({
    UserId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    DateDay: {
        type: Date,
        required: true
    },
    DatePoint: {
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