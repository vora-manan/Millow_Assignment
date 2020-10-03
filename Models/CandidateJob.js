const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const CandidateJobScehma = new Schema({
    status: {
        type: String,
        default: 'In process'
    },
    candidate_id: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Candidate'
    },
    companyjob_id: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'CompanyJob'
    }
});

module.exports = mongoose.model('CandidateJob', CandidateJobScehma);