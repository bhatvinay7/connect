const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const AptSchema = new Schema({
    question: {
        type: String
    },
    type: {
        type: String
    },
    defficulty: {
        type: String
    },
    options: {
        opt: [String]
    },
    ans: {
        type: String
    }
}, { timestamps: true });

const Apt = model('aptquestion', AptSchema);

module.exports = Apt;
