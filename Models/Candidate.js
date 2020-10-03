const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CandidateSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email_id: {
        type: String,
        unique: true
    },
    details: {
        type: String
    },
    college: {
        type: String
    }
});

module.exports = mongoose.model('Candidate', CandidateSchema);